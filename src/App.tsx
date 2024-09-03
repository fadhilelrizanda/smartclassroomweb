import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Content from "./components/Content";
import Setting from "./components/Setting";
import Table from "./components/Table";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";

const LOGIN_EXPIRATION_MINUTES = 60; // 1 hour

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (status: boolean) => {
    if (status) {
      const loginTime = new Date().getTime();
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("loginTime", loginTime.toString());
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loginTime");
    }
    setIsAuthenticated(status);
  };

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    const storedLoginTime = localStorage.getItem("loginTime");

    if (storedAuthStatus === "true" && storedLoginTime) {
      const loginTime = parseInt(storedLoginTime, 10);
      const currentTime = new Date().getTime();
      const expirationTime = LOGIN_EXPIRATION_MINUTES * 60 * 1000;

      if (currentTime - loginTime < expirationTime) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        handleLogin(false); // Clear expired login
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Content />} />
        <Route
          path="/setting"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/table"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Table />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
