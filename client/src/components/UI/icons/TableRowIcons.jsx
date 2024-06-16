import React ,{useState} from 'react'
import { Link } from "react-router-dom";
import styles from "@/components/leadgen/LeadgensList.module.css";
import { VscPreview } from "react-icons/vsc";
import { FiCopy } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

import Tooltip from "@/components/Tooltip";
const TableRowIcons = ({leadgen}) => {
   const [copiedToken, setCopiedToken] = useState(null);
   const handleCopyToken = (token) => {
      navigator.clipboard.writeText(token).then(() => {
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000); // Reset icon after 2 seconds
      }, (err) => {
        console.error('Could not copy text: ', err);
      });
    };
  return (
   <div className={styles.iconsContainer}>
   <Link
     className={styles.link}
     to={`/leadgens/details/${leadgen.token}`}
   >
     <Tooltip
       icon={VscPreview}
       text="See more details"
       iconFilter={false}
     />
   </Link>
   <div onClick={() => handleCopyToken(leadgen.token)}>
     <Tooltip 
       icon={copiedToken === leadgen.token ? IoMdCheckmark : FiCopy} 
       text={copiedToken === leadgen.token ? "Copied!" : "Copy ID"} 
     />
   </div>
 </div>
  )
}

export default TableRowIcons