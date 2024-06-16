import React from "react";
import { TbSquarePlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { HiOutlineFilter } from "react-icons/hi";

import Tooltip from "@/components/Tooltip";
import styles from "./ContentLayout.module.css";
import SearchInput from "@/components/UI/inputs/SearchInput";
const ContentLayout = ({ pageName, children }) => {
  const navigate = useNavigate();

  const handleCreateNewLeadgen = () => {
    navigate("/leadgens/new"); // Navigate to the new leadgen page relative to the current path
  };
  return (
    <div className={styles.contentContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.headerText}>{pageName}</h3>
      </div>
      <div className={styles.dataContainer}>
        <div className={styles.filtersContainer}>
          <div className={styles.dataWrapper}>
          <SearchInput/>
         
            <Tooltip icon={HiOutlineFilter} text="Filter" iconFilter />

            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={handleCreateNewLeadgen}
              >
                <TbSquarePlus size={16} />
                Create new Leadgen
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dataContainer}>{children}</div>
    </div>
  );
};

export default ContentLayout;
