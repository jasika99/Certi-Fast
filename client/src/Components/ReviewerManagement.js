import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios"; // For API requests

const ReviewerContainer = styled.div`
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

const FormCard = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-left: 6%;
  background-image: linear-gradient(to bottom, #f5e4c0, #f1e7c1, #edeac3, #e9edc6, #e4f0c9);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  width: 80%;
`;

const Title = styled.h1`
  color: #333;
  font-size: 32px;
  margin-top: 20px;
`;

const CommentSection = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.reject ? "#dc3545" : "#28a745")};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => (props.reject ? "#c82333" : "#218838")};
  }
`;

const ReviewerManagement = () => {
  const [comment, setComment] = useState("");

  const handleForward = () => {
    const data = {
      comment: comment,
      status: "forwarded"
    };
    axios.post("/api/forms/review", data).then((res) => {
      alert("Form Forwarded!");
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleReject = () => {
    const data = {
      comment: comment,
      status: "rejected"
    };
    axios.post("/api/forms/review", data).then((res) => {
      alert("Form Rejected!");
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <ReviewerContainer>
      <Title>Reviewer Dashboard</Title>
      <FormCard>
        <h2>Form Details</h2>
        <p>Here you can review the form, provide comments, and either forward or reject the form.</p>
        <CommentSection
          placeholder="Add a comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <ButtonGroup>
          <ActionButton onClick={handleForward}>Forward Form</ActionButton>
          <ActionButton reject onClick={handleReject}>Reject Form</ActionButton>
        </ButtonGroup>
      </FormCard>
    </ReviewerContainer>
  );
};

export default ReviewerManagement;