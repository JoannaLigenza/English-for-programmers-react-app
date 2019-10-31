import React, { createContext, useState} from 'react';

export const SettingsContext = createContext();

// save data in localstorage
const saveDataInStorage = () => {
    if (localStorage.getItem("language") === null) {
        localStorage.setItem("language", JSON.stringify("en-GB"));
    }
    if (localStorage.getItem("speakRate") === null) {
        localStorage.setItem("speakRate", JSON.stringify("normal"));
    }
    if (localStorage.getItem("wordsInLesson") === null) {
        localStorage.setItem("wordsInLesson", JSON.stringify(5));
    }
}
saveDataInStorage();

// get data from localstorage
const language = JSON.parse(localStorage.getItem("language"));
const speakRate = JSON.parse(localStorage.getItem("speakRate"));
const wordsInLesson = JSON.parse(localStorage.getItem("wordsInLesson"));

const SettingsContextProvider = (props) => {
    const [settings, changeSettings] = useState({
        language: language,
        speakRate: speakRate,
        wordsInLesson: wordsInLesson
    });
    const setSettings = (option, set) => {
        if (option === "language") {
            localStorage.setItem("language", JSON.stringify(set));
            return changeSettings({...settings, language: set});
        }
        if (option === "speakRate") {
            localStorage.setItem("speakRate", JSON.stringify(set));
            return changeSettings({...settings, speakRate: set});
        }
        if (option === "wordsInLesson") {
            localStorage.setItem("wordsInLesson", JSON.stringify(set));
            return changeSettings({...settings, wordsInLesson: set});
        }
    }
    return (
        <SettingsContext.Provider value={{ settings, setSettings }} >
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
