import { NavLink, useLocation } from "react-router-dom";
import style from "./NavigationMenu.module.css";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import {useAuth} from "@/context/AuthContext";

const NavigationMenu = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const isLeadgensActive = location.pathname.startsWith("/leadgens");

  return (
    <header className={style.header}>
      <nav>
        <ul className={style.list}>
          <li>
            <NavLink 
              className={({ isActive }) => isActive ? style.active : style.link} 
              to="/" 
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              className={({ isActive }) => isLeadgensActive ? style.active : style.link} 
              to="/leadgens/list"
            >
              My Leadgens
            </NavLink>
          </li>
          <li>
            <NavLink 
              className={({ isActive }) => isActive ? style.active : style.link} 
              to="/users"
            >
              Users
            </NavLink>
          </li>
        </ul>
        {isLoggedIn && (
          <ProfileDropdown />
        )}
      </nav>
    </header>
  );
};

export default NavigationMenu;
