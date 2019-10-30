import React, { createContext, useState } from 'react';

export const VisibilityContext = createContext();

// save data in localstorage
const saveDataInStorage = () => {
    if (localStorage.getItem("areAdvanceOptionsVisible") === null) {
        localStorage.setItem("areAdvanceOptionsVisible", JSON.stringify(false));
    }
}
saveDataInStorage();

// get data from localstorage
const areAdvanceOptionsVisible = JSON.parse(localStorage.getItem("areAdvanceOptionsVisible"));

const VisibilityContextProvider = (props) => {
    const [isVisible, setVisibility] = useState( {
        isOptionsVisible: false,
        isMainVisible: false,
        activeOverlap: "none",
        areAdvanceOptionsVisible: areAdvanceOptionsVisible
    });
    const changeVisibility = (option, set) => {
        if (option === "settings") {
            setVisibility({...isVisible, isOptionsVisible: !isVisible.isOptionsVisible});
        }
        if (option === "main") {
            setVisibility({...isVisible, isMainVisible: !isVisible.isMainVisible});
        }
        if (option === "activeOverlap") {
            setVisibility({...isVisible, activeOverlap: set});
        }
        if (option === "areAdvanceOptionsVisible") {
            localStorage.setItem("areAdvanceOptionsVisible", JSON.stringify(set));
            setVisibility({...isVisible, areAdvanceOptionsVisible: set});
        }
    }
    return (
        <VisibilityContext.Provider value={{isVisible, changeVisibility}} >
            {props.children}
        </VisibilityContext.Provider>
    )
}

export default VisibilityContextProvider;



// <VisibilityContext.Provider value={{isVisible}} >   <- in value you might set object {{isVisible, setVisibility}} or array [isVisible, setVisibility]