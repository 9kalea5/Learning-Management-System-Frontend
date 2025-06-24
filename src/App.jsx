import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/auth';
import { MainWrapper } from './components/MainWrapper';
import { PrivateRoutes } from './components/PrivateRoutes';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainWrapper>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Navigate to="/dashboard" replace />
                </PrivateRoutes>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />
          </Routes>
        </MainWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;