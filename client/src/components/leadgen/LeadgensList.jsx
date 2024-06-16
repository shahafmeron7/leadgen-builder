import React, { useState,useEffect } from "react";
import styles from "./LeadgensList.module.css";
import { updateLeadgenStatus } from "@/utils/api/leadgenService";
import Modal from "@/components/UI/modal/Modal";
import LeadgenTableRow from "./LeadgenTableRow";
import LeadgenTableHeader from "./LeadgenTableHeader";

const LeadgensList = ({ leadgens: fetchedLeadgens }) => {
  const [selectedLeadgens, setSelectedLeadgens] = useState([]);
  const [leadgens, setLeadgens] = useState(fetchedLeadgens);
  const [showModal, setShowModal] = useState(false);
  const [currentToken, setCurrentToken] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });


  useEffect(() => {
    const sortedLeadgens = [...leadgens].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setLeadgens(sortedLeadgens);
  }, [sortConfig]);


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeadgens(leadgens.map((leadgen) => leadgen.token));
    } else {
      setSelectedLeadgens([]);
    }
  };

  const handleSelectOne = (e, token) => {
    if (e.target.checked) {
      setSelectedLeadgens([...selectedLeadgens, token]);
    } else {
      setSelectedLeadgens(selectedLeadgens.filter((id) => id !== token));
    }
  };

  const isSelected = (token) => selectedLeadgens.includes(token);

  const handleOpenModal = (token) => {
    setCurrentToken(token);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentToken(null);
  };

  const handleConfirmModal = async () => {
    if (currentToken) {
      try {
        const updatedLeadgen = await updateLeadgenStatus(currentToken);
        setLeadgens((prevList) =>
          prevList.map((leadgen) =>
            leadgen.token === currentToken ? updatedLeadgen.leadgen : leadgen
          )
        );
        setShowModal(false);
      } catch (error) {
        console.error("Error updating leadgen status:", error);
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.flexTable}>
        <LeadgenTableHeader
          handleSelectAll={handleSelectAll}
          allSelected={selectedLeadgens.length === leadgens.length}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
        <div className={styles.flexTbody}>
          {leadgens.map((leadgen) => (
            <LeadgenTableRow
              key={leadgen.token}
              leadgen={leadgen}
              isSelected={isSelected}
              handleSelectOne={handleSelectOne}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </div>
      </div>

      <Modal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmModal}>
        <p>Are you sure you want to change its status?</p>
      </Modal>
    </div>
  );
};

export default LeadgensList;
