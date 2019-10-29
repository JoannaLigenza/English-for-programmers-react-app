import React, { createContext, useState} from 'react';

export const SettingsContext = createContext();

const SettingsContextProvider = (props) => {
    const [settings, setSettings] = useState({
        wordsInLesson: 5
    });

    return (
        <SettingsContext.Provider value={{ settings }} >
            {props.children}
        </SettingsContext.Provider>
    )
}

export default SettingsContextProvider;
