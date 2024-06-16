import React,{useEffect, useState} from "react";
import style from "./SideBar.module.css";
import SearchInput from "../UI/inputs/SearchInput";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineChevronRight } from "react-icons/hi2";

const SideBar = () => {
   const [isExpanded,setIsExpanded] =useState();



  return (
    <div className={style.sideNavContainer}>
      <nav className={style.miniSideNavWrapper}>
        <ul className={style.miniSideList}>
         <li className={` ${style.expandButton}`} onClick={()=>setIsExpanded((prevState)=>!prevState)}>
            <HiOutlineChevronRight size={16}/>
         </li>
          <li className={`${style.miniSideListItem} ${style.active}`}><BiHomeAlt size={16}/></li>
          <li className={style.miniSideListItem}>test list item</li>
          <li className={style.miniSideListItem}>test list item</li>
          <li className={style.miniSideListItem}>test list item</li>
        </ul>
      </nav>
      <div className={`${style.expandedNavContainer} ${isExpanded ? style.expanded : undefined}`}>
      <div className={style.expandedNavTitleContainer}>
      <span>^</span>
         <h2>
            Title
         </h2>
      </div>
      <div className={style.expandedNavContent}>


        <nav className={style.expandedNavWrapper}>
        <SearchInput/>
          <ul className={style.expandedSideList}>
            <li className={style.expandedSideListItem}>test list2 item</li>
            <li className={style.expandedSideListItem}>test list2 item</li>
            <li className={style.expandedSideListItem}>test list2 item</li>
            <li className={style.expandedSideListItem}>test list2 item</li>
          </ul>
        </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
