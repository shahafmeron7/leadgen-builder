import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { baseAuthURL } from "@/utils/data/url";
import useAuth from "@/hooks/useAuth";
import AppWrapper from "@/layouts/AppWrapper";
import InputField from "@/components/UI/inputs/InputField";
import AuthButton from "@/components/UI/buttons/AuthButton";
const AuthForm = () => {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === "/login";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const endpoint = isLogin ? "login" : "signup";
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(`${baseAuthURL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("userdata", data);
        const user = {
          name: data.user.name,
          email: data.user.email,
        };
        handleLogin(user, data.token); // Use handleLogin to set the user and token
        navigate("/");
      } else {
        setError(data.message || `${isLogin ? "Login" : "Signup"} failed`);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };
  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);
    setInputErrors((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
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
              {error && <p style={{ color: "red" }}>{error}</p>}
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
