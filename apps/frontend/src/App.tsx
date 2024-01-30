import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { SignupPage } from './pages/signupPage/SignupPage';
import { HomePage } from './pages/homePage/HomePage';
import { LoginPage } from './pages/loginPage/LoginPage';
import { UserPage } from './pages/userPage/UserPage';
import { AdminPage } from './pages/adminPage/AdminPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/admin/:id" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
