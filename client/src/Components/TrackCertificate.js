import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #282c34;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
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

const Content = styled.div`
  width: 80%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
`;

const CaptchaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CaptchaImage = styled.div`
  background-color: #eee;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  border-radius: 4px;
  user-select: none;
`;

const CaptchaInput = styled(Input)`
  flex: 1;
  margin-left: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const TrackCertificate = () => {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [certificateData, setCertificateData] = useState(null);

  // Function to generate a simple captcha
  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha(); // Generate captcha on component load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      setErrorMessage('Captcha verification failed. Please try again.');
      return;
    }

    try {
      // Make a request to the server to track the certificate by application number
      const response = await axios.get(`http://localhost:3001/certificate/track/${applicationNumber}`);
      
      if (response.data) {
        setCertificateData(response.data);
        setErrorMessage(''); // Clear any errors
      } else {
        setErrorMessage('No certificate found for the provided application number.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while tracking the certificate.');
    }
  };

  return (
    <CenteredContainer>
      <DashboardContainer>
        <Title>Track Certificate</Title>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="applicationNumber">Application Number</Label>
            <Input
              type="text"
              id="applicationNumber"
              value={applicationNumber}
              onChange={(e) => setApplicationNumber(e.target.value)}
              placeholder="Enter your application number"
              required
            />

            <Label htmlFor="captcha">Captcha Verification</Label>
            <CaptchaWrapper>
              <CaptchaImage>{captcha}</CaptchaImage>
              <CaptchaInput
                type="text"
                id="captcha"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Enter the captcha"
                required
              />
            </CaptchaWrapper>

            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            <Button type="submit">Track Certificate</Button>
          </Form>

          {certificateData && (
            <div>
              <h3>Certificate Details:</h3>
              <p><strong>Certificate ID:</strong> {certificateData.id}</p>
              <p><strong>Name:</strong> {certificateData.name}</p>
              <p><strong>Status:</strong> {certificateData.status}</p>
              {/* Add more certificate details here if available */}
            </div>
          )}
        </Content>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default TrackCertificate;

