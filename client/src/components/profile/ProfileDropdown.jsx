import React, { useState,useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";

import styles from "./ProfileDropdown.module.css";
import {useAuth} from "@/context/AuthContext";
import chevarrow from "@/images/icons/chevarrow.svg?url";
const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };
  useEffect(() => {
   const handleClickOutside = (event) => {
     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
       setIsOpen(false);
     }
   };

   document.addEventListener('mousedown', handleClickOutside);
   return () => {
     document.removeEventListener('mousedown', handleClickOutside);
   };
 }, [dropdownRef]);
  return (
    <div className={styles.profileContainer} onClick={toggleDropdown} ref={dropdownRef}>
      <div className={styles.profileIcon}>{user?.name}</div>
      <div className={styles.profileName}>
        <div className={styles.name}>
          <p>{user?.name}</p>
          <img src={chevarrow} alt="arrow_icon" width="16" height="16"
                      className={isOpen ? styles.chevronOpen : styles.chevronClosed}

           />
        </div>
        <p className={styles.profileRole}>user role</p>
      </div>
      {isOpen && (
        <div className={styles.dropDownMenu}>
          <ul className={styles.listMenu}>
            <li className={styles.menuItem}>
              <FaRegUser />
              User Profile
            </li>
            <li onClick={onLogout} className={styles.menuItem}>
              <PiSignOut />
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
