import React, { createContext, useState, useContext } from 'react';
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
            return setDictionaryData({...dictionaryData, notPassedWords: [], points: 0, repetitionWords: repetitionWords });
        }
        if (option === "notPassedWordsRemove") {
            // set "repetition" value to "passed" key for removed word
             const newDictionary = dictionaryData.dictionary.map(word => {
                let newWord = word;
                // set2 is current word id
                if (set2 === word.id) {
                    newWord.passed = "repetition";
                }
                return newWord;
            });
            localStorage.setItem("dictionary", JSON.stringify(newDictionary));

            repetitionWords.splice(set, 1);
            localStorage.setItem("repetitionWords", JSON.stringify(repetitionWords));
            return setDictionaryData({...dictionaryData, repetitionWords: repetitionWords, dictionary: newDictionary });
        }
        if (option === "points") {
            const points = dictionaryData.points + 1;
            return setDictionaryData({...dictionaryData, points: points})
        }
        if (option === "passed") {
            const newDictionary = dictionaryData.dictionary.map(word => {
                let newWord = word;
                // set2 is current word id
                if (set2 === word.id) {
                    // set is information if word is passed
                    if (newWord.passed === "no") {
                        newWord.passed = "no";
                    } else {
                        newWord.passed = set;
                    }
                }
                return newWord;
            });
            localStorage.setItem("dictionary", JSON.stringify(newDictionary));
            return setDictionaryData({...dictionaryData, dictionary: newDictionary})
        }
        if (option === "repetitionWords") {
            const lessonNum = lessonNumber + 1;
            let notPassedWords = dictionaryData.notPassedWords;
            const newRepetitionWords = repetitionWords;
            notPassedWords.forEach(element => {
                newRepetitionWords.push(element);
            });
            // save newRepetitionWords in localstorage
            localStorage.setItem("repetitionWords", JSON.stringify(newRepetitionWords));
            localStorage.setItem("lessonNumber", JSON.stringify(lessonNum));
            
            return setDictionaryData({...dictionaryData, repetitionWords: newRepetitionWords });
        }
    }

    return (
        <DictionaryContext.Provider value={{ dictionaryData, changeDictionaryData }} >
            {props.children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider;
