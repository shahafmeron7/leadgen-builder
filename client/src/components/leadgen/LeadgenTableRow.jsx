import React from "react";
import styles from "./LeadgensList.module.css";
import TableRowIcons from "@/components/UI/icons/TableRowIcons";

const LeadgenTableRow = ({ leadgen, isSelected, handleSelectOne, handleOpenModal }) => {
  return (
    <div
      className={`${styles.flexTr} ${styles.tableRow} ${
        isSelected(leadgen.token) ? styles.selected : ""
      }`}
      onClick={(e) => handleSelectOne(e, leadgen.token)}
    >
      <div className={`${styles.flexTd} ${styles.checkbox}`}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isSelected(leadgen.token)}
          onChange={(e) => handleSelectOne(e, leadgen.token)}
        />
      </div>
      <div className={styles.flexTd}>{leadgen.title}</div>
      <div className={styles.flexTd}>{leadgen.token}</div>
      <div className={styles.flexTd}>{leadgen.flowName}</div>
      <div className={styles.flexTd}>{leadgen.questions.length}</div>
      <div
        onClick={() => handleOpenModal(leadgen.token)}
        className={styles.flexTd}
      >
        <div className={` ${styles.status} ${
          leadgen.status === "active" ? styles.active : styles.inActive
        }`}>
          {leadgen.status}
        </div>
      </div>
      <div className={styles.flexTd}>
        {new Date(leadgen.createdAt).toLocaleString()}
      </div>
      <div className={styles.flexTd} style={{ position: "relative" }}>
        {new Date(leadgen.updatedAt).toLocaleString()}
        <div className={styles.iconsContainer}>
          <TableRowIcons leadgen={leadgen} />
        </div>
      </div>
    </div>
  );
};

export default LeadgenTableRow;
