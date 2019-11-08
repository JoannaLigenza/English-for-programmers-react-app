import React, { createContext, useState, useContext } from 'react';
import { MainContentContext } from './MainContentContext.js';
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

    const setContent = useContext(MainContentContext);
    const testEachWordXTimes = setContent.content.testEachWordXTimes;
    const testLoop = setContent.content.testLoop;

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
            return setDictionaryData({...dictionaryData, notPassedWords: [], points: 0 });
        }
        if (option === "points") {
            let points = dictionaryData.points;
            if (set === "yes") {
                points = dictionaryData.points + 1;
            }
            const newDictionary = dictionaryData.dictionary.map(word => {
                let newWord = word;
                // set2 is current word id       // add "yes" only if word is testet the last time in test (each word is tested few times)
                if (set2 === word.id && testLoop === testEachWordXTimes) {
                    newWord.passed = set;
                }
                return newWord;
            });
            localStorage.setItem("dictionary", JSON.stringify(newDictionary));
            return setDictionaryData({...dictionaryData, points, dictionary: newDictionary})
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
