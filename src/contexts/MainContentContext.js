import React, { createContext, useState } from 'react';

export const MainContentContext = createContext();

const MainContentContextProvider = (props) => {
    const [content, setContent] = useState( {
        content: "none",
        actualAnswers: "", 
        numberOfAnswers: 6, 
        actualTest: "",
        actualTestNumber: ""
    });
    const changeContent = (option, set, set2) => {
        if (option === "setContentInOverlap") {
            return setContent({...content, content: set});
        }
        if (option === "actualAnswers") {
            return setContent({...content, actualAnswers: set});
        }
        if (option === "actualTest") {
            return setContent({...content, actualTest:  set, actualTestNumber: set2});
        }
    }
    return (
        <MainContentContext.Provider value={{content, changeContent }} >
            {props.children}
        </MainContentContext.Provider>
    )
}

export default MainContentContextProvider;
