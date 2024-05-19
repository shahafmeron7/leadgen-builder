import { NavLink } from "react-router-dom";
import style from "./NavigationMenu.module.css";

const NavigationMenu = () => {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.list}>
          <li>
            <NavLink className={({isActive})=> isActive ? style.active : undefined} to="/" end>Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive})=> isActive ? style.active : undefined} to="/leadgens">My Leadgens</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationMenu;
