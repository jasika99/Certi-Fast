import React, { useState } from 'react';
import styled from 'styled-components';

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

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };

  return (
    <CenteredContainer>
      <DashboardContainer>
        <Title>Feedback</Title>
        <Content>
          <FeedbackForm onSubmit={handleSubmit}>
            <Label htmlFor="feedback">Your Feedback</Label>
            <TextArea
              id="feedback"
              rows="6"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your feedback here"
            />
            <SubmitButton type="submit">Submit Feedback</SubmitButton>
          </FeedbackForm>
        </Content>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default Feedback;
