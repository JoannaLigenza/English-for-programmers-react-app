import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';

const Score = () => {
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const setContent = useContext(MainContentContext);
    const storagePoints = JSON.parse(localStorage.getItem("points"));
    const incorrectAnswers = getDictionary.dictionaryData.notPassedWords.length;
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const testEachWordXTimes = setContent.content.testEachWordXTimes;
    const points = (wordsInLesson*testEachWordXTimes) - incorrectAnswers;

    useEffect(() => {
        // returning function from useEffect makes that it's content is called just before score component is being unmount
        return () => {
            getDictionary.changeDictionaryData("notPassedWordsZero");
        }
    },[incorrectAnswers]);

    return (
        <div className="testSection" >
            <div className="score">
                <div className="score__element">
                    <h4>Prawidłowe odpowiedzi: {points}</h4>
                </div>
                <div className="score__element">
                    <h4>Punkty łącznie: {storagePoints}</h4>
                </div>
                <div className="score__element">
                    <h4>Nieprawidłowe odpowiedzi: {incorrectAnswers}</h4>
                </div>
                <div className="score__element">
                    <div className="score__element--button" onClick={() => setContent.changeContent("setContentInOverlap", "TestTwo")}> 
                        Powtórka 
                    </div>
                    <div className="score__element--button" onClick={() => setContent.changeContent("setContentInOverlap", "TestOne")}> 
                        Kolejny test 
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Score;