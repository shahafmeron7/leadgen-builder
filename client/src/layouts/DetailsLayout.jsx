import React from 'react'
import styles from './ContentLayout.module.css'
import { useNavigate ,Link} from 'react-router-dom'
import { TbArrowLeft } from "react-icons/tb";
const DetailsLayout = ({pageName,children}) => {
   const navigate = useNavigate();

  return (
   <div className={styles.contentContainer}>
   <div className={styles.pageHeader}>
   <TbArrowLeft size={24} onClick={()=>navigate(-1)}/>


     <h3 className={styles.headerText}>
     {pageName}
     </h3>
   </div>
  
   <div className={styles.dataContainer}>
       {children}
   </div>
</div>
  )
}

export default DetailsLayout