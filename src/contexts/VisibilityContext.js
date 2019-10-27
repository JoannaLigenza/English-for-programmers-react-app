import React, { createContext, useState } from 'react';

export const VisibilityContext = createContext();

const VisibilityContextProvider = (props) => {
    const [isVisible, setVisibility] = useState( {
        isOptionsVisible: false,
        isMainVisible: false,
    });
    const changeVisibility = (option) => {
        if (option === "settings") {
            setVisibility({...isVisible, isOptionsVisible: !isVisible.isOptionsVisible});
        }
        if (option === "main") {
            setVisibility({...isVisible, isMainVisible: !isVisible.isMainVisible});
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