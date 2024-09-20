// ToggleLoginSignup.js
import React, { useState } from 'react';
import styled from 'styled-components';
import OfficerLogin from './OfficerLogin';
import OfficerSignUp from './OfficerSignUp'; // Similarly, you can import UserLogin, ReviewerLogin, etc.
import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 110vh;
  background-image: url('/assets/bg.jpg');
  background-size: cover;
`;

const ToggleButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#ccc')};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#aaa')};
  }
`;

function ToggleLoginSignup() {
  const [role, setRole] = useState('officer');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Wrapper>
      <ToggleButtons>
        <ToggleButton active={role === 'user'} onClick={() => setRole('user')}>User</ToggleButton>
        <ToggleButton active={role === 'officer'} onClick={() => setRole('officer')}>Officer</ToggleButton>
        <ToggleButton active={role === 'reviewer'} onClick={() => setRole('reviewer')}>Reviewer</ToggleButton>
      </ToggleButtons>

      <ToggleButtons>
        <ToggleButton active={isLogin} onClick={() => setIsLogin(true)}>Login</ToggleButton>
        <ToggleButton active={!isLogin} onClick={() => setIsLogin(false)}>Signup</ToggleButton>
      </ToggleButtons>

      {role === 'officer' && isLogin && <OfficerLogin />}
      {role === 'officer' && !isLogin && <OfficerSignUp />}
      
      {/* Add similar conditions for UserLogin, ReviewerLogin, UserSignUp, and ReviewerSignUp */}
    </Wrapper>
  );
}

export default ToggleLoginSignup;
