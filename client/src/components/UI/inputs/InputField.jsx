import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ type, value, placeholder, onChange, required, error }) => {
   return (
     <div className={styles.inputWrapper}>
       
         <div className={styles.formElementContainer}>
           <div className={`${styles.formElementWrapper} ${error ? styles.inputError : ""}`} data-testid="form-element-wrapper">
             <div className={styles.addonsWrapper}>
              
               <input
                 name={type}
                 placeholder={placeholder}
                 type={type}
                 data-testid={`${type}-input`}
                 className={styles.inputField}
                 value={value}
                 onChange={onChange}
                 required={required}
               />
             </div>
           </div>
         </div>
         {error && (
           <p className={`${styles.errorMessage} ${error ? styles.showError : ''}`}>{error}</p>
         )}
  
     </div>
   );
 };
export default InputField;
