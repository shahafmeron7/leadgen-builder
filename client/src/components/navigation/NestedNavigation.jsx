import React from 'react'
import { NavLink } from 'react-router-dom';
import style from "./NestedNavigation.module.css";

const NestedNavigation = ({links}) => {
  return (
   <header className={style.header}>
   <nav>
     <ul className={style.list}>
     {links.map(link=>(
      <li key={link.name}>{
         <NavLink className={({isActive})=> isActive ? style.active : undefined} to ={link.to} end>{link.name}</NavLink>
      }</li>
     ))}

     </ul>
   </nav>
 </header>
  )
}

export default NestedNavigation