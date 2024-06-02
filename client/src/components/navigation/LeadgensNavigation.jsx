import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './LeadgensNavigation.module.css';

const LeadgensNavigation = () => {
  return (
   <header className={classes.header}>
   <nav>
     <ul className={classes.list}>
       <li>
       <NavLink className={({isActive})=> isActive ? classes.active : undefined} to ="/leadgens" end>All Leadgens</NavLink>
       </li>
       <li>
       <NavLink className={({isActive})=> isActive ? classes.active : undefined} to = "/leadgens/new">New Leadgen</NavLink>
       </li>
     </ul>
   </nav>
 </header>
  )
}

export default LeadgensNavigation