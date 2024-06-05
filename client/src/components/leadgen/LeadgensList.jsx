import React from "react";
import { Link } from "react-router-dom";
import styles from "./LeadgensList.module.css";
const LeadgensList = ({ leadgens }) => {
  return (
    <div className={styles.listContainer}>
      {leadgens.map((leadgen) => (
        <Link className={styles.link} key={leadgen.token} to={`/leadgens/details/${leadgen.token}`}>
          <div className={styles.listItem}>
            <div className={styles.fieldRow}>
              <p className={styles.fieldTitle}>Name</p>
              <p className={styles.fieldDesc}>{leadgen.title}</p>
            </div>
            <div className={styles.fieldRow}>
              <p className={styles.fieldTitle}>Token ID</p>
              <p className={styles.fieldDesc}>{leadgen.token}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default LeadgensList;
