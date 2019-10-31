import React, { createContext, useState } from 'react';

export const MainContentContext = createContext();

const MainContentContextProvider = (props) => {
    const [content, setContent] = useState( {
        content: "none",
        actualAnswers: ""
    });
    const changeContent = (option, set) => {
        if (option === "setContentInOverlap") {
            return setContent({...content, content: set});
        }
        if (option === "actualAnswers") {
            return setContent({...content, actualAnswers: set});
        }
    }
    return (
        <MainContentContext.Provider value={{content, changeContent }} >
            {props.children}
        </MainContentContext.Provider>
    )
}

export default MainContentContextProvider;
