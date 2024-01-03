import React, { useState } from "react";
import css from "./style.module.css";

import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/SideBar";

const App = () => {
  const[showSidebar, setShowSidebar] = useState(false);

  const toggleSideBar = () => {
    // setState(prevState => {
    //   return { showSidebar: !prevState.showSidebar };
    // });
    setShowSidebar(prevState => (!prevState.showSidebar));
  };

  
  return (
    <div>
      <Toolbar toggleSideBar={toggleSideBar} />

      <SideBar
        showSidebar={showSidebar}
        toggleSideBar={toggleSideBar}
      />

      <main className={css.Content}>
        <BurgerPage />
      </main>
    </div>
  );
}

export default App;
