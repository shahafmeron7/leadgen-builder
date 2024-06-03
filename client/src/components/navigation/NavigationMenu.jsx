import { NavLink} from "react-router-dom";
import style from "./NavigationMenu.module.css";
import ProfileDropdown from "@/components/profile/ProfileDropdown";
import useAuth from "@/hooks/useAuth";

const NavigationMenu = () => {
  const { isLoggedIn } = useAuth(); 

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
          <li>
            <NavLink className={({isActive})=> isActive ? style.active : undefined} to="/users">Users</NavLink>
          </li>

        </ul>
        {isLoggedIn() && (
          <ProfileDropdown/>
            )}
       
      </nav>
    </header>
  );
};

export default NavigationMenu;
