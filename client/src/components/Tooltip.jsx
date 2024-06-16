import React, { useState } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({ icon:Icon,text ,iconFilter}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleMouseEnter = () => {
    setIsToggled(true);
  };

  const handleMouseLeave = () => {
    setIsToggled(false);
  };

  return (
    <div 
      className={`${ iconFilter ? styles.iconFilter: styles.iconDoc}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon size={20}/>
      <div className={`${styles.tooltipContainer} ${isToggled ? styles.visible : ''}`}>
        {text}
        <div className={styles.tooltipArrow}></div>
      </div>
    </div>
  );
};

export default Tooltip;
