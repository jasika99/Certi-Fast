import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const FormContainer = styled.div`
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
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.3rem;
  font-weight: 700;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function UserLogin({ setIsLoggedIn, isLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/user/login", { email, password }, { withCredentials: true })
            .then(result => {
                if (result.data === "Success") {
                    axios.get('http://localhost:3001/user', { withCredentials: true })
                        .then(response => {
                            if (response.data.user) {
                                setIsLoggedIn(true);
                                navigate("/user/home", { state: { user: response.data.user } });
                            }
                        });
                } else {
                    alert("Login failed");
                }
            })
            .catch(err => console.log(err));
    };
    return (
        <Wrapper>
            <FormContainer>
                <Heading>Login</Heading>
                <Form onSubmit={handleLogin}>
                    <InputWrapper>
                        <Input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputWrapper>
                    <Button type="submit">Login</Button>
                </Form>
                <LinkText>Don't have an account? <a href="/user/signup">SignUp</a></LinkText>
            </FormContainer>
        </Wrapper>
    );
}

export default UserLogin;
