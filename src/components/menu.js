import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'
import Settings from './settings.js';

const Menu = () => {
    const visibility = useContext(VisibilityContext);
    return (
        <div className="menu">
            <header className="header">

            </header>
            <Settings />
            <div className={visibility.isVisible.isOptionsVisible ? "showSettings settingsOpened" : "showSettings"} onClick={() => visibility.changeVisibility("settings")}> X </div>
        </div>
    )
}

export default Menu;