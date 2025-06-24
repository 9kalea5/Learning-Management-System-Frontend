import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/auth';
import { MainWrapper } from './components/MainWrapper';
import { PrivateRoutes } from './components/PrivateRoutes';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainWrapper>
          <Routes>
            <Route path="/register" element={<RegisterPage />}
            />
          </Routes>
        </MainWrapper>
      </AuthProvider>
    </Router>
  );
}

export default App;