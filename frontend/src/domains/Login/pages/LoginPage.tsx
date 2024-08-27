// LoginPage.tsx
import React, { useState } from "react";
import LoginComponents from "../components/LoginComponents";
import RegisterPage from "../../Register/pages/RegisterPage";

interface LoginProps {
  onClose: () => void;
  setShowModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage = ({ onClose, setShowModalLogin }: LoginProps) => {
  const [change, setChange] = useState(false);
  const handleChangeAuth = () => {
    setChange((prevChange) => !prevChange);
  };

  return (
    <>
      {change ? (
        <RegisterPage />
      ) : (
        <LoginComponents
          onClose={onClose}
          setShowModalLogin={setShowModalLogin}
          handleChangeAuth={handleChangeAuth}
        />
      )}
    </>
  );
};

export default LoginPage;
