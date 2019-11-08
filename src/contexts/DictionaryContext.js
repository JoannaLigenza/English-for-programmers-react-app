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
    if (localStorage.getItem("points") === null) {
        localStorage.setItem("points", JSON.stringify(0));
    }
    if (localStorage.getItem("repetitionWords") === null) {
        localStorage.setItem("repetitionWords", JSON.stringify([]));
    }
}
saveDataInStorage();


const DictionaryContextProvider = (props) => {
    // get data from localstorage
    const getDataFromStorage = JSON.parse(localStorage.getItem("dictionary"));
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const points = JSON.parse(localStorage.getItem("points"));
    const repetitionWords = JSON.parse(localStorage.getItem("repetitionWords"));

    // state
    const [dictionaryData, setDictionaryData] = useState({
        dictionary: getDataFromStorage,
        repetitionWords: repetitionWords,
        notPassedWords: [],
        points: points,
    });

    const changeDictionaryData = (option, set, set2) => {
        if (option === "notPassedWords") {
            const notPassedWords = dictionaryData.notPassedWords;
            notPassedWords.push([set, set2]);
            return setDictionaryData({...dictionaryData, notPassedWords: notPassedWords});
        }
        if (option === "notPassedWordsZero") {
            const notPassedWords = dictionaryData.notPassedWords;
            notPassedWords.push([set, set2]);
            return setDictionaryData({...dictionaryData, notPassedWords: [] });
        }
        if (option === "points") {
            return setDictionaryData({...dictionaryData, points: dictionaryData.points + 1})
        }
        if (option === "repetitionWords") {
            const lessonNum = lessonNumber + 1;
            let notPassedWords = dictionaryData.notPassedWords;
            const repetitionWords = dictionaryData.repetitionWords;
            notPassedWords.forEach(element => {
                repetitionWords.push(element);
            });
            // save repetitionWords in localstorage
            localStorage.setItem("repetitionWords", JSON.stringify(repetitionWords));
            localStorage.setItem("lessonNumber", JSON.stringify(lessonNum));
            
            return setDictionaryData({...dictionaryData, repetitionWords: repetitionWords });
        }
    }

    return (
        <DictionaryContext.Provider value={{ dictionaryData, changeDictionaryData }} >
            {props.children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider;
