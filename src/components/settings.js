import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'

const Settings = () => {
    const visibility = useContext(VisibilityContext);
    return (
        <div className={visibility.isVisible.isOptionsVisible ? "settings visible" : "settings hidden"}>
            settings<br></br>
            settings<br></br>
            settings<br></br>
            settings<br></br>
        </div>
    )
}

export default Settings;