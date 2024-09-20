import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const DashboardSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 30px;
  gap: 20px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
`;

const ChartContainer = styled.div`
  width: 600px;
  height: 400px;
  margin-top: 30px;
`;

const AboutSection = styled.div`
  margin-top: 40px;
  text-align: center;
  max-width: 800px;
`;

const ServiceInfo = styled.p`
  margin-bottom: 20px;
`;

const Services = () => {
  const [certificatesData, setCertificatesData] = useState([]);
  const [totalCertificates, setTotalCertificates] = useState(0);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:3001/api/certificates')
      .then((response) => {
        setCertificatesData(response.data);
        setTotalCertificates(response.data.length);
      })
      .catch((error) => console.error('Error fetching certificates data:', error));
  }, []);

  // Example data for the graph
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Certificates Generated',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40], // Replace with actual data
      }
    ]
  };

  return (
    <Container>
      <SectionTitle>Dashboard</SectionTitle>

      <DashboardSection>
        <StatCard>
          <h3>Total Certificates Generated</h3>
          <p>{totalCertificates}</p>
        </StatCard>
        <StatCard>
          <h3>Pending Certificates</h3>
          <p>15</p> {/* Example value */}
        </StatCard>
        <StatCard>
          <h3>Certificates Approved</h3>
          <p>120</p> {/* Example value */}
        </StatCard>
      </DashboardSection>

      <SectionTitle>Certificates Over Time</SectionTitle>
      <ChartContainer>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: 'Certificates Generated Over Time',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      </ChartContainer>

      <AboutSection>
        <SectionTitle>What We Do</SectionTitle>
        <ServiceInfo>
          Our system generates and manages various types of certificates including employee certifications, course completions, and more.
        </ServiceInfo>
        <ServiceInfo>
          We offer easy tracking and management of certificates, ensuring a smooth process for both the issuer and the receiver.
        </ServiceInfo>
        <SectionTitle>Types of Certificates</SectionTitle>
        <ServiceInfo>
          - Employee Certifications<br/>
          - Course Completion Certificates<br/>
          - Award and Recognition Certificates<br/>
          - Professional Certifications
        </ServiceInfo>
      </AboutSection>
    </Container>
  );
};

export default Services;
