import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './LeadgensNavigation.module.css';

const CustomNavigation = ({links}) => {
  return (
   <header className={classes.header}>
   <nav>
     <ul className={classes.list}>
     {links.map(link=>{
      <li>{
         <NavLink className={({isActive})=> isActive ? classes.active : undefined} to ={link.to} end>{link.name}</NavLink>
      }</li>
     })}

     </ul>
   </nav>
 </header>
  )
}

export default CustomNavigation