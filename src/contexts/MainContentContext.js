import React, { createContext, useState } from 'react';

export const MainContentContext = createContext();

const MainContentContextProvider = (props) => {
    const [content, setContent] = useState( {
        content: "none",
        actualAnswers: "", 
        numberOfAnswers: 6,                 // number of answers in one test
        testEachWordXTimes: 2,
        testLoop: 1                         // (first, second) round of test
    });
    const changeContent = (option, set) => {
        if (option === "setContentInOverlap") {
            return setContent({...content, content: set});
        }
        if (option === "actualAnswers") {
            return setContent({...content, actualAnswers: set});
        }
        if (option === "testLoop") {
            return setContent({...content, testLoop: content.testLoop + 1});
        }
    }
    return (
        <MainContentContext.Provider value={{content, changeContent }} >
            {props.children}
        </MainContentContext.Provider>
    )
}

export default MainContentContextProvider;
