import React, { createContext, useState } from 'react';

export const MainContentContext = createContext();

const MainContentContextProvider = (props) => {
    const [content, setContent] = useState( {
        content: "none"
    });
    const changeContent = (content) => {
        setContent({content: content});
    }
    return (
        <MainContentContext.Provider value={{content, changeContent }} >
            {props.children}
        </MainContentContext.Provider>
    )
}

export default MainContentContextProvider;
