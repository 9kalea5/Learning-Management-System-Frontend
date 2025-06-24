import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/auth';
import MainWrapper from './components/MainWrapper';
import PrivateRoutes from './components/PrivateRoutes';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <MainWrapper>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected route */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </MainWrapper>
    </AuthProvider>
  );
}

export default App;
