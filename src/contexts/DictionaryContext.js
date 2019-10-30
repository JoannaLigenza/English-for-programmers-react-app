import React, { createContext, useState} from 'react';
import Data from '../data/dictionary.json';

export const DictionaryContext = createContext();

// get data from json file and shuffle it
const data = () => {
    const getDataFromJson = Data.slice();
    const shuffledData = [];
    for (let i=0; i < Data.length; i++) {
        const random = Math.floor(Math.random()*getDataFromJson.length);
        shuffledData.push(getDataFromJson[random]);
        getDataFromJson.splice(random, 1);
        
    }
    return shuffledData;
};

const shuffledData = data();

// save data in localstorage
const saveDataInStorage = () => {
    if (localStorage.getItem("dictionary") === null) {
        localStorage.setItem("dictionary", JSON.stringify(shuffledData));
    }
    if (localStorage.getItem("lessonNumber") === null) {
        localStorage.setItem("lessonNumber", JSON.stringify(1));
    }
}
saveDataInStorage();

// get data from localstorage
const getDataFromStorage = JSON.parse(localStorage.getItem("dictionary"));
const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));


const DictionaryContextProvider = (props) => {
    const [dictionaryData] = useState({
        dictionary: getDataFromStorage,
        lessonNumber: lessonNumber,
    });
    
    return (
        <DictionaryContext.Provider value={{ dictionaryData }} >
            {props.children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider;
