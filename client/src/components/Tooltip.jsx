import React, { useState } from 'react';
import styles from './Tooltip.module.css';
import { HiOutlineFilter } from "react-icons/hi";

const Tooltip = ({ text }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleMouseEnter = () => {
    setIsToggled(true);
  };

  const handleMouseLeave = () => {
    setIsToggled(false);
  };

  return (
    <div 
      className={styles.filtersWrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HiOutlineFilter />
      <div className={`${styles.tooltipContainer} ${isToggled ? styles.visible : ''}`}>
        {text}
        <div className={styles.tooltipArrow}></div>
      </div>
    </div>
  );
};

export default Tooltip;
