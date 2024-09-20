import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200vh;
  background-color: #282c34;
`;

const Heading = styled.h1`
  color: black;
  font-size: 1.5rem;
  text-align: center;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 200vh;
  background-image: url('/assets/bg.jpg');
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-top: 80px;
  margin-bottom: 10px;
`;

const ServiceList = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Services = styled.div`
  width: 80%;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const ServiceTitle = styled.h2`
`;

const ServiceButton = styled.button`
  background-color: #007bff;
  color: white;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
  width: 182px;
  height: 60px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CustomizationContainer = styled.div`
  width: 80%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;
const ServiceHeading= styled.h2`
text-align: center;
`;
const SaveButton = styled.button`
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #138496;
  }
`;

const ButtonGroup = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

const FieldButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const FormCard = styled.div`
align-items: center;
justify-content: center;
display:flex;
flex-direction: column;
margin-left:6%;
  background-image: linear-gradient(to bottom, #f5e4c0, #f1e7c1, #edeac3, #e9edc6, #e4f0c9);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 80%;
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  flex: 2;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  flex: 2;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #c82333;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 20px;
  &:hover {
    background-color: #c82333;
  }
`;



  
const fixedFields = [
  { label: 'Applicant Name', type: 'text', name: 'name', required: true },
  { label: 'Mobile No.', type: 'tel', name: 'mobile', required: true, pattern: "[0-9]{10}" },
  { label: 'Age', type: 'number', name: 'age', required: true, min: 1 },
  { label: 'Gender', type: 'select', name: 'gender', options: ['Male', 'Female', 'Other'], required: true },
  { label: 'Date of Birth', type: 'date', name: 'dob', required: true },
  { label: 'Aadhaar No.', type: 'text', name: 'aadhaar', required: true },
  { label: 'Email', type: 'email', name: 'email', required: true },
];

const availableFields = [
  { label: 'PAN No.', type: 'text', name: 'pan' },
  { label: 'Monthly Income', type: 'number', name: 'income' },
  { label: 'PIN Code', type: 'text', name: 'pincode' },
  { label: 'Marital Status', type: 'select', name: 'marital_status', options: ['Single', 'Married'] },
];

function OfficerHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const [officer, setOfficer] = useState(location.state?.officer);
  const [loading, setLoading] = useState(!officer);
  const [services, setServices] = useState([
    { id: 1, name: 'Income Tax Certificate', formFields: [] },
    { id: 2, name: 'Caste Certificate', formFields: [] },
    { id: 3, name: 'Land Certificate', formFields: [] },
    { id: 4, name: 'Death Certificate', formFields: [] },
  ]);
  const [selectedService, setSelectedService] = useState(null);
  const [customFields, setCustomFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!officer) {
      axios.get('http://localhost:3001/officer', { withCredentials: true })
        .then(response => {
          if (response.data.officer) {
            setOfficer(response.data.officer);
          } else {
            navigate("/officer/login");
          }
        })
        .catch(() => navigate("/officer/login"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [officer, navigate]);

  const addCustomField = (field) => {
    setCustomFields((prevFields) => [...prevFields, field]);
  };

  const removeCustomField = (fieldName) => {
    setCustomFields((prevFields) => prevFields.filter(field => field.name !== fieldName));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const renderFields = () => (
    <FormWrapper>
      {fixedFields.map((field, index) => (
        <FormRow key={index}>
          <Label>{field.label}:</Label>
          {field.type === 'select' ? (
            <Select name={field.name} onChange={handleChange} required={field.required}>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type}
              name={field.name}
              onChange={handleChange}
              required={field.required}
              pattern={field.pattern || null}
              min={field.min || null}
            />
          )}
        </FormRow>
      ))}
      {customFields.map((field, index) => (
        <FormRow key={index}>
          <Label>{field.label}:</Label>
          {field.type === 'select' ? (
            <Select name={field.name} onChange={handleChange}>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </Select>
          ) : (
            <Input
              type={field.type}
              name={field.name}
              onChange={handleChange}
            />
          )}
          <RemoveButton onClick={() => removeCustomField(field.name)}>Remove</RemoveButton>
        </FormRow>
      ))}
    </FormWrapper>
  );
  const [showModal, setShowModal] = useState(false);
  const [uploads, setUploads] = useState({}); // To store uploaded files for each field

  // Custom fields and available fields (replace with actual data)
  

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e, field) => {
    setUploads({ ...uploads, [field.name]: e.target.files[0] });
  };

  const handleProceed = () => {
    setShowModal(true); // Show modal on proceed
  };

  const handleSubmitDocuments =  async(e) => {
    e.preventDefault();
    try {
        const formDetails = new FormData();

        // Append form data (field values)
        Object.keys(formData).forEach((key) => {
            formDetails.append(key, formData[key]);
        });

        // Append uploaded documents (make sure the field name matches what the backend expects)
        Object.entries(uploads).forEach((file) => {
            formDetails.append('documents', file);
        });

        // Send data to the server
        const response = await axios.post('http://localhost:3001/officer/apply', formDetails, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            alert('Application submitted successfully!');
            setShowModal(false);
        } else {
            alert('Failed to submit the application');
        }
    } catch (error) {
        console.error('Error submitting the application:', error);
        alert('An error occurred while submitting your application');
    }
};

  const renderSelectedService = () => {
    if (!selectedService) return <p>Please select a service to customize.</p>;
    return (
      <CustomizationContainer>
        <ServiceHeading>Customizing: {selectedService.name} Application Form</ServiceHeading>
        <ButtonGroup>
          {availableFields.map((field, index) => (
            <FieldButton key={index} onClick={() => addCustomField(field)}>
              Add {field.label}
            </FieldButton>
          ))}
        </ButtonGroup>
        <FormCard>
          <h3>Application form</h3>
          {renderFields()}
          <SaveButton onClick={handleProceed}>Proceed to Apply</SaveButton>
        </FormCard>
        {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h3>Upload Documents</h3>
            {customFields.map((field, index) => (
              <div key={index}>
                <label>{field.label} Document</label>
                <input
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(e) => handleUpload(e, field)}
                />
              </div>
            ))}
            <UploadButton onClick={handleSubmitDocuments}>
              Submit Documents
            </UploadButton>
            <CloseButton onClick={() => setShowModal(false)}>
              Close
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
      </CustomizationContainer>
    );
  };

  if (loading) {
    return <CenteredContainer><Heading>Loading...</Heading></CenteredContainer>;
  }

  return (
    <DashboardContainer>
      <Title>Officer Dashboard</Title>
      <Heading>Welcome Home {officer && officer.name}!</Heading>
      <ServiceList>
        <ServiceTitle>Services</ServiceTitle>
        <Services>
          {services.map((service) => (
            <ServiceButton key={service.id} onClick={() => setSelectedService(service)}>
              {service.name}
            </ServiceButton>
          ))}
        </Services>
      </ServiceList>
      {renderSelectedService()}
    </DashboardContainer>
  );
}

export default OfficerHome;