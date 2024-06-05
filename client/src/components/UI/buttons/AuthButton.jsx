import React from "react";
import styles from "@/pages/auth/AuthForm.module.css";

const AuthButton = ({ isDisabled, isLogin }) => {
  return (
    <button
      className={`${styles.authButton} ${isDisabled ? styles.disabled : ""}`}
      disabled={isDisabled}
      type="submit"
    >
      {isLogin ? "Login" : "Signup"}
    </button>
  );
};

export default AuthButton;
