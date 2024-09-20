
import React, { useState } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const LevelInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
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

const HierarchyManagement = () => {
  const [hierarchyLevels, setHierarchyLevels] = useState(1);
  const [hierarchyTitles, setHierarchyTitles] = useState([]);
  const navigate = useNavigate();

  const handleLevelsChange = (e) => {
    setHierarchyLevels(e.target.value);
    const newTitles = Array.from({ length: e.target.value }, (_, index) => hierarchyTitles[index] || '');
    setHierarchyTitles(newTitles);
  };

  const handleTitleChange = (index, title) => {
    const updatedTitles = [...hierarchyTitles];
    updatedTitles[index] = title;
    setHierarchyTitles(updatedTitles);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/officer/setHierarchy', {
        levels: hierarchyLevels,
        titles: hierarchyTitles,
      }, { withCredentials: true });

      alert('Hierarchy saved successfully');
      navigate('/officer/dashboard');
    } catch (error) {
      console.error('Error saving hierarchy', error);
      alert('Failed to save hierarchy');
    }
  };

  return (
    <Container>
        <FormCard>
      <Title>Hierarchy Management</Title>
      <label>Number of Hierarchy Levels</label>
      <LevelInput
        type="number"
        value={hierarchyLevels}
        onChange={handleLevelsChange}
        min={1}
        max={10}
      />
      <div>
        {Array.from({ length: hierarchyLevels }).map((_, index) => (
          <div key={index}>
            <label>Title for Level {index + 1}</label>
            <LevelInput
              type="text"
              value={hierarchyTitles[index] || ''}
              onChange={(e) => handleTitleChange(index, e.target.value)}
            //   placeholder={Reviewer, Approver}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleSubmit}>Save Hierarchy</Button>
      </FormCard>
    </Container>
  );
};

export default HierarchyManagement;