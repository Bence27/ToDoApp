import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignupPage } from './pages/signupPage/SignupPage'
import { HomePage } from './pages/homePage/HomePage'
import { LoginPage } from './pages/loginPage/LoginPage'

//import { useEffect, useState } from 'react'

function App() {



  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />


      </Routes>
    </div>
  )
}

export default App
