import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-right: 40px;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.3rem 1.4rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b71c1c;
  }
`;

function Logout({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsLoggedIn(false);
                    navigate("/");
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    };

    return (
        <StyledButton onClick={handleLogout}>
            Logout
        </StyledButton>
    );
}

export default Logout;
