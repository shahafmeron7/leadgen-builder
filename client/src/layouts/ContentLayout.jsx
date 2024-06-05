import React from "react";
import { CiSearch } from "react-icons/ci";
import { TbSquarePlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import Tooltip from "@/components/Tooltip";
import styles from "./ContentLayout.module.css";
const ContentLayout = ({ pageName,children }) => {
  const navigate = useNavigate();

  const handleCreateNewLeadgen = () => {
    navigate("/leadgens/new"); // Navigate to the new leadgen page relative to the current path
  };
  return (
    <div className={styles.contentContainer}>
        <div className={styles.pageHeader}>
          <h3 className={styles.headerText}>
          {pageName}
          </h3>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.dataWrapper}>
          <div className={styles.searchWrapper}>
          
            <CiSearch/>
            <input type="text" placeholder="search" />
          </div>
          <Tooltip text="Filter"/>
          
          </div>

          <div className={styles.buttonContainer} >
            <button className={styles.button} onClick={handleCreateNewLeadgen}>
          <TbSquarePlus size={20}/>
            Create new Leadgen</button>
          </div>
        </div>
        <div className={styles.dataContainer}>
            {children}
        </div>
    </div>
  );
};

export default ContentLayout;
