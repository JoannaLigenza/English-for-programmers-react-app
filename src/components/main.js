import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'

const Main = () => {
    const visibility = useContext(VisibilityContext);
    console.log(visibility.isVisible);
    return (
        <div className={visibility.isVisible.isMainVisible ? "main visible" : "main hidden"} >
            <div className="mainContent">
                <div className="button button--close" onClick={() => visibility.changeVisibility("main")}>X</div>
            </div>
        </div>
    )
}

export default Main;