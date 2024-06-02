import {Outlet} from 'react-router-dom'
import NavigationMenu from '@/components/navigation/NavigationMenu'
import style from './MainLayout.module.css'
const MainLayout = () => {
  return (
    <>
   <NavigationMenu/>
   <main className={style.content}>

   <Outlet/>
   </main>
    </>
  )
}

export default MainLayout