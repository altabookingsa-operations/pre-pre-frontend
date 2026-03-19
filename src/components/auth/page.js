'use client';
import { useState, useEffect } from "react";
import LoginGate from "../home/LoginGate";
import VerifyNumberModal from "../otpPopup";
import RegistrationPage from "../registrationPage";

const AuthPage = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [type, setType] = useState('login');

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    setAuth(storedAuth === "true");
  }, []);

  if (auth === null) return null;

  if (!auth) {
    if (type === 'login') return <LoginGate setAuth={setAuth} />;
    if (type === 'register') return <RegistrationPage setType={setType} />;
    if (type === 'otp') return <VerifyNumberModal setType={setType} />;
  }

  return children;
};

export default AuthPage;