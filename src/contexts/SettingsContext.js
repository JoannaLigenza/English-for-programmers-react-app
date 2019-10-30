import React, { createContext, useState} from 'react';

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
    const [settings, changeSettings] = useState({
        language: "en-GB",
        speakRate: "normal",
        wordsInLesson: 5,
    });
    const setSettings = (option, set) => {
        if (option === "language") {
            return changeSettings({...settings, language: set})
        }
        if (option === "speakRate") {
            return changeSettings({...settings, speakRate: set})
        }
        if (option === "wordsInLesson") {
            return changeSettings({...settings, wordsInLesson: set})
        }
    }
    return (
        <SettingsContext.Provider value={{ settings, setSettings }} >
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
