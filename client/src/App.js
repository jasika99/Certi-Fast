import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Services from './Components/Services';
import OfficerHome from './Components/OfficerHome';
import Header from './Components/Header';
import OfficerLogin from './Components/OfficerLogin';
import OfficerSignUp from './Components/OfficerSignUp';
import UserLogin from './Components/UserLogin';
import UserHome from './Components/UserHome';
import UserSignUp from './Components/UserSignUp';
//user dashboard
import TrackCertificate from './Components/TrackCertificate';
import DownloadCertificate from './Components/DownloadCertificate';
import Feedback from './Components/Feedback';

//hierarchy management
import HierarchyManagement from './Components/HierarchyManagement';
import ReviewerPage from './Components/ReviewerPage';


// import ProtectedRoute from "./Components/ProtectedRoute";
import axios from 'axios';
import LandingPage from './Components/LandingPage';
import ReviewerManagement from './Components/ReviewerManagement';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/officer', { withCredentials: true })
            .then(response => {
                if (response.data.officer) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <div className="App">
            <Router>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/officer/home" element={<OfficerHome />} />
                    <Route path="/officer/login" element={isLoggedIn ? <Navigate to="/officer/home" /> : <OfficerLogin setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/officer/signup" element={isLoggedIn ? <Navigate to="/officer/home" /> : <OfficerSignUp setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/user/home" element={<UserHome />} />
                    <Route path="/user/login" element={isLoggedIn ? <Navigate to="/user/home" /> : <UserLogin setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/user/signup" element={isLoggedIn ? <Navigate to="/user/home" /> : <UserSignUp setIsLoggedIn={setIsLoggedIn} />} />
                    {/* user dashboard */}
                    <Route path="/user/track-certificate" element={<TrackCertificate />} />
                    <Route path="/user/download-certificate" element={<DownloadCertificate />} />
                    <Route path="/user/feedback" element={<Feedback />} />
                    {/* hierarchy */}
                    {/* <Route path = "/officer/dashboard" element={<OfficerHome/>}/> */}
                    <Route path="/officer/hierarchy" element={<HierarchyManagement />} />
                    <Route path="/review" element={<ReviewerManagement />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;