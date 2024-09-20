import React from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
function LandingPage(){
    return(
        <VideoContainer>
        <StyledVideo
          src="/assets/fast.mp4" // Change to the path of your video file
          autoPlay
          loop
          muted
          playsInline
        />
        <QuoteContainer>
            "Empowering citizens through digital certification – fast, reliable, and at your fingertips."
          </QuoteContainer>
      </VideoContainer>  
    )
}
export default LandingPage;
const VideoContainer = styled.div`
display:flex;
flex:1;
  position: fixed;
 top:100px;
  left: 0;
  overflow: hidden;
  align-items:center;
  z-index: -1;
`;

// Styled component for the video element
const StyledVideo = styled.video`
  width: 500px
  height: 300px
  object-fit: cover; /* Ensures the video covers the entire viewport */
`;
const QuoteContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #333;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
`;