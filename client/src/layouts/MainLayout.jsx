import React from "react";
import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";

import NavigationMenu from "@/components/navigation/NavigationMenu";
import SideBar from "@/components/navigation/SideBar";
const MainLayout = ({ children }) => {
  return (
    
      <div className={styles.mainView}>
        <div className={styles.appMainWrapper}>
          <div className={styles.mainContentWrapper}>
            <NavigationMenu />
            <main className={styles.mainLayout}>
            <SideBar/>
              <Outlet>
                <div className={styles.mainContent}></div>
                {children}
              </Outlet>
            </main>
          </div>
        </div>
      </div>
    
  );
};

export default MainLayout;
