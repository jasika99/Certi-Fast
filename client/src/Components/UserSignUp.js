import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

const Wrapper = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 110vh;
  background-image: url('/assets/bg.jpg');
  background-size: cover;
  background-position:center;
`;

const StyledPaper = styled.div`
  padding: 2rem;
  background-color: white;
  margin: 100px auto;
  border-radius: 1rem;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  width: 80vw;
  
  @media (min-width: 600px) {
    width: 50vw;
  }
  
  @media (min-width: 900px) {
    width: 40vw;
  }
  
  @media (min-width: 1200px) {
    width: 30vw;
    height: 60vh;
  }
  
  @media (min-width: 1536px) {
    width: 20vw;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
`;

const StyledButton = styled.button`
  margin-top: 2rem;
  padding: 0.7rem 1.4rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;

const LinkText = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: center;
  a {
    color: blue;
    text-decoration: none;
    font-weight: bold;
  }
`;

function UserSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/user/signup", { name, email, password })
      .then(result => {
        if (result.status === 201) {
          console.log("signup success")
          navigate("/user/login");
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email.");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <Wrapper>
      <StyledPaper>
        <Heading>Signup</Heading>
        <Form onSubmit={handleSignup}>
          <Input 
            type="text" 
            placeholder="Enter Name" 
            name="name" 
            onChange={(e) => setName(e.target.value)} 
          />
          <Input 
            type="email" 
            placeholder="Enter Email" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Enter Password" 
            name="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <StyledButton type="submit">SignUp</StyledButton>
        </Form>
        <LinkText>
          Already have an account? <a href="/user/login">Login</a>
        </LinkText>
      </StyledPaper>
    </Wrapper>
  );
}

export default UserSignUp;
