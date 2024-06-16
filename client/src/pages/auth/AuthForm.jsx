import React, { useState,useEffect } from "react";
import styles from "./AuthForm.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";  
import AppWrapper from "@/layouts/AppWrapper";
import InputField from "@/components/UI/inputs/InputField";
import AuthButton from "@/components/UI/buttons/AuthButton";
const AuthForm = () => {
  const { authenticate, isLoginPending, loginError,isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  const validateFields = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!isLogin && !name) {
      errors.name = "Name is required";
    }
    setInputErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    setInputErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const endpoint = isLogin ? "login" : "signup";
    const body = isLogin ? { email, password } : { email, password, name };

    await authenticate(endpoint, body);

    
  };
  const isDisabled = isLogin
  ? !email || !password
  : !email || !password || !name;

  return (
    <AppWrapper>
      <div className={styles.authMainContent}>
        <div className={styles.authContainer}>
          <div className={styles.authWrapper}>
            <h2 className={styles.title}>{isLogin ? "Login" : "Signup"}</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              {!isLogin && (
                <InputField
                  type="text"
                  value={name}
                  placeholder="Enter your full name"
                  onChange={handleInputChange(setName, 'name')}
                  required={!isLogin}
                  error={inputErrors.name}
                />
              )}
              <InputField
                type="text"
                placeholder="Enter your work email"
                value={email}
                onChange={handleInputChange(setEmail, 'email')}
                required
                error={inputErrors.email}
              />
              <InputField
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleInputChange(setPassword, 'password')}
                required
                error={inputErrors.password}
              />
              {loginError && <p style={{ color: "red" }}>{loginError}</p>}
              <AuthButton isDisabled={isDisabled} isLogin={isLogin} />
            </form>
            <p>
              {isLogin ? (
                <span>
                  Don't have an account? <a href="/signup">Signup</a>
                </span>
              ) : (
                <span>
                  Already have an account? <a href="/login">Login</a>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default AuthForm;
