import React, { createContext, useState } from 'react';

export const VisibilityContext = createContext();

const VisibilityContextProvider = (props) => {
    const [isVisible, setVisibility] = useState( {
        isOptionsVisible: false,
    });
    const changeVisibility = (option) => {
        setVisibility({...isVisible, isOptionsVisible: !isVisible.isOptionsVisible});
    }
    return (
        <VisibilityContext.Provider value={{isVisible, changeVisibility}} >
            {props.children}
        </VisibilityContext.Provider>
    )
}

export default VisibilityContextProvider;



// <VisibilityContext.Provider value={{isVisible}} >   <- in value you might set object {{isVisible, setVisibility}} or array [isVisible, setVisibility]