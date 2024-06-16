import React from 'react';
import styles from './Modal.module.css'; // Import the CSS module

const Modal = ({ show, onClose, onConfirm, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalContent}>
          {children}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.modalButton} onClick={onClose}>Cancel</button>
          <button className={styles.modalButton} onClick={onConfirm}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
