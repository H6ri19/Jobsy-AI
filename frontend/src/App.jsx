import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './pages/Dashboard';
import EditResume from './components/EditResume';
import UserProvider from './context/userContext';
import InterviewPrep from './pages/InterviewPrep';
import LiveInterview from './pages/LiveInterview';
import InterviewResult from './pages/InterviewResult'; // (we’ll create next)
import PrepHistory from './pages/PrepHistory';
import AIResumeAnalysis from './pages/AIResumeAnalysis';
import ATSCheck from './pages/ATSCheck';
const App = () => {
  return (
    <UserProvider>
      <div>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume/:resumeId" element={<EditResume />} />
          {/* 🔥 INTERVIEW ROUTES */}
          <Route path="/interview/prep/:resumeId" element={<InterviewPrep />} />
          <Route path="/interview/live/:resumeId" element={<LiveInterview />} />
          <Route
            path="/interview/result/:sessionId"
            element={<InterviewResult />}
          />

          <Route path="/interview/history" element={<PrepHistory />} />
          <Route
            path="/resume/:resumeId/ai-analysis"
            element={<AIResumeAnalysis />}
          />
          <Route path="/resume/:resumeId/ats" element={<ATSCheck />} />
        </Routes>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      ></Toaster>
    </UserProvider>
  );
};

export default App;
