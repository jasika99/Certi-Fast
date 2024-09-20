import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200vh;
  background-color: #282c34;
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

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <DashboardContainer>
        <Title>User Dashboard</Title>
        <ServiceList>
          <Services>
          <ServiceButton onClick={() => navigate('/user/apply-certificate')}>
              Apply For Certificate
            </ServiceButton>
            <ServiceButton onClick={() => navigate('/user/track-certificate')}>
              Track Certificate
            </ServiceButton>
            <ServiceButton onClick={() => navigate('/user/download-certificate')}>
              Download Certificate
            </ServiceButton>
            <ServiceButton onClick={() => navigate('/user/feedback')}>
              Give Feedback
            </ServiceButton>
          </Services>
        </ServiceList>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default UserHome;
