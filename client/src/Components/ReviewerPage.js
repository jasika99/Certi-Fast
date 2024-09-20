import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-bottom: 20px;
`;

const EFormCard = styled.div`
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
`;

const EFormDetails = styled.div`
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => props.color || '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#0056b3'};
  }
`;

const CommentBox = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ReviewerPage = () => {
  const [eForms, setEForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch pending eForms for review from the backend
    axios.get('http://localhost:3001/reviewer/pendingForms', { withCredentials: true })
      .then(response => {
        setEForms(response.data);
      })
      .catch(error => {
        console.error('Error fetching eForms', error);
      });
  }, []);

  const handleSelectForm = (form) => {
    setSelectedForm(form);
    setComment('');
  };

  const handleDecision = (decision) => {
    if (!selectedForm) return;

    axios.post('http://localhost:3001/reviewer/submitReview', {
      formId: selectedForm.id,
      decision,
      comment,
    }, { withCredentials: true })
      .then(() => {
        alert(`Form has been ${decision.toLowerCase()}`);
        setSelectedForm(null);
        setComment('');
        setEForms(eForms.filter(form => form.id !== selectedForm.id));
      })
      .catch(error => {
        console.error('Error submitting review', error);
        alert('Failed to submit review');
      });
  };

  return (
    <Container>
      <Title>Reviewer Dashboard</Title>
      {selectedForm ? (
        <EFormCard>
          <h2>EForm Details</h2>
          <EFormDetails>
            <p><strong>ID:</strong> {selectedForm.id}</p>
            <p><strong>Applicant:</strong> {selectedForm.applicant}</p>
            <p><strong>Details:</strong> {selectedForm.details}</p>
          </EFormDetails>
          <h3>Add Comments</h3>
          <CommentBox value={comment} onChange={(e) => setComment(e.target.value)} />
          <ButtonGroup>
            <Button color="#28a745" hoverColor="#218838" onClick={() => handleDecision('Accepted')}>
              Accept
            </Button>
            <Button color="#dc3545" hoverColor="#c82333" onClick={() => handleDecision('Rejected')}>
              Reject
            </Button>
          </ButtonGroup>
        </EFormCard>
      ) : (
        <div>
          <h3>Select an eForm to Review</h3>
          {eForms.length > 0 ? (
            eForms.map((form) => (
              <EFormCard key={form.id} onClick={() => handleSelectForm(form)}>
                <p><strong>ID:</strong> {form.id}</p>
                <p><strong>Applicant:</strong> {form.applicant}</p>
                <p><strong>Details:</strong> {form.details}</p>
              </EFormCard>
            ))
          ) : (
            <p>No pending eForms for review.</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default ReviewerPage;
