import { NavLink , useNavigate} from "react-router-dom";
import style from "./NavigationMenu.module.css";

const NavigationMenu = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }
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
          <li>
            <button onClick={handleLogout} className={style.logoutButton}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationMenu;
