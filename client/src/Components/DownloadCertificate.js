import React from 'react';
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

const DownloadCertificate = () => {
  return (
    <CenteredContainer>
      <DashboardContainer>
        <Title>Download Certificate</Title>
        <Content>
          <p>Enter your certificate ID to download your certificate.</p>
          {/* Add certificate download logic here */}
        </Content>
      </DashboardContainer>
    </CenteredContainer>
  );
};

export default DownloadCertificate;
