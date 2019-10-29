import React, { createContext, useState, useEffect } from 'react';
import Data from '../data/dictionary.json';

export const DictionaryContext = createContext();
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
const saveSortedDataInStorage = () => {
    if (localStorage.getItem("dictionary") === null) {
        localStorage.setItem("dictionary", JSON.stringify(shuffledData));
    }
    console.log(localStorage.getItem("dictionary"))
}
saveSortedDataInStorage();
const getDataFromStorage = JSON.parse(localStorage.getItem("dictionary"))


const DictionaryContextProvider = (props) => {
    const [dictionary, setDictionary] = useState(getDataFromStorage);
    // const setDictionaryData = (content) => {
    //     setDictionary( content );
    // }
    
    // useEffect(() => {
    //     // set shuffled dictionary data only once
    //     if (localStorage.getItem("dictionary") === null) {
    //         localStorage.setItem("dictionary", JSON.stringify(shuffledData));
    //     } else {
    //         const getDataFromLocalStorge = localStorage.getItem(JSON.parse("dictionary"));
    //         setDictionary( getDataFromLocalStorge );
    //         console.log("dict ",getDataFromLocalStorge);
    //     }
    // }, [setDictionary])
    
    return (
        <DictionaryContext.Provider value={{ dictionary }} >
            {props.children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider;
