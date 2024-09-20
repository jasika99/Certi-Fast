// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import Logout from './Logout';

// const HeaderBar = styled.header`
//   background-color: #333;
//   padding: 1rem 0;
// `;

// const Toolbar = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//  padding: 10px 20px;
//   background-color: #fff;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   position: fixed;
//   width: 100%;
//   top: 0;
//   left: 0;
//   z-index: 10;
 
// `;

// const Title = styled.h1`
// margin-left:20px;
//   display: flex;
//   align-items: center;
//   font-weight:bold;
//   color:#F09418;
//   font-size:25px;
// `;
// const NavLinks = styled.nav`
//   display: flex;
//   gap: 20px;
//   margin-right:50px;
// `;
// const StyledButton = styled(Link)`
//    text-decoration: none;
//   color: #007bff;
//   font-weight: bold;

//   &:hover {
//     color: #0056b3;
//   }
// `;

// function Header({ isLoggedIn, setIsLoggedIn }){
//     return (
//         <HeaderBar>
//             <Toolbar>
//                 <Title>CERTIfast</Title>
//                 {!isLoggedIn ? (
//                     <>
//                     <NavLinks>
//                         <StyledButton variant="error" to="/officer/login">Login</StyledButton>
//                         <StyledButton variant="success" to="/officer/signup">Signup</StyledButton>
//                         <StyledButton to="/services">Services</StyledButton>
//                         <StyledButton to="/support">Support</StyledButton>
//                     </NavLinks>
//                     </>
//                 ) : (
//                     <Logout setIsLoggedIn={setIsLoggedIn} />
//                 )}
//             </Toolbar>
//         </HeaderBar>
//     );
// };
// export default Header;









///////////only header



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logout from './Logout';

// Styled components
const HeaderBar = styled.header`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f4f4f4')};
  padding: 1rem 0;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${(props) => (props.theme === 'dark' ? '#222' : '#fff')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Title = styled.h1`
  margin-left: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${(props) => (props.theme === 'dark' ? '#FFD700' : '#F09418')};
  font-size: 25px;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 20px;
  margin-right: 50px;
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  color: ${(props) => (props.theme === 'dark' ? '#FFD700' : '#007bff')};
  font-weight: bold;

  &:hover {
    color: ${(props) => (props.theme === 'dark' ? '#fff' : '#0056b3')};
  }
`;

const ThemeToggle = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 20px;
  color: ${(props) => (props.theme === 'dark' ? '#FFD700' : '#333')};
`;

// Main Header Component
function Header({ isLoggedIn, setIsLoggedIn }) {
  const [theme, setTheme] = useState('light');

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <HeaderBar theme={theme}>
      <Toolbar theme={theme}>
        <Title theme={theme}>CERTIfast</Title>
        <NavLinks>
          {!isLoggedIn ? (
            <>
              <StyledButton theme={theme} to="/officer/login">Login</StyledButton>
              <StyledButton theme={theme} to="/officer/signup">Signup</StyledButton>
              <StyledButton theme={theme} to="/services">Services</StyledButton>
              <StyledButton theme={theme} to="/support">Support</StyledButton>
            </>
          ) : (
            <Logout setIsLoggedIn={setIsLoggedIn} />
          )}
          {/* Theme Toggle Icon */}
          <ThemeToggle theme={theme} onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </NavLinks>
      </Toolbar>
    </HeaderBar>
  );
}

export default Header;



