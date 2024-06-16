import React from "react";
import styles from "./LeadgensList.module.css";
import { FaArrowDownLong ,FaArrowUpLong} from "react-icons/fa6";

const LeadgenTableHeader = ({ handleSelectAll, allSelected, handleSort, sortConfig }) => {
  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaArrowUpLong className={styles.sortArrow} /> : <FaArrowDownLong className={styles.sortArrow} />;
    }

     return <FaArrowDownLong className={styles.sortArrow} style={{ opacity: 0 }} />;

  };

  return (
    <div className={styles.flexThead}>
      <div className={styles.flexTr}>
        <div className={`${styles.flexTh} ${styles.tableHeader} ${styles.checkbox}`}>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={allSelected}
          />
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('title')}>
          Name {renderSortArrow('title')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('token')}>
          Token ID {renderSortArrow('token')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('flowName')}>
          Flow Name {renderSortArrow('flowName')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('questions')}>
          Questions Count {renderSortArrow('questions')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('status')}>
          Status {renderSortArrow('status')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('createdAt')}>
          Created At {renderSortArrow('createdAt')}
        </div>
        <div className={`${styles.flexTh} ${styles.tableHeader}`} onClick={() => handleSort('updatedAt')}>
          Updated At {renderSortArrow('updatedAt')}
        </div>
      </div>
    </div>
  );
};

export default LeadgenTableHeader;
