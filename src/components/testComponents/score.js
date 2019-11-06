import React, { useContext } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';

const Score = () => {
    const getDictionary = useContext(DictionaryContext);
    const setContent = useContext(MainContentContext);
    const storagePoints = JSON.parse(localStorage.getItem("points"));
    const incorrectAnswers = getDictionary.dictionaryData.notPassedWords.length;
    const points = setContent.content.numberOfAnswers - incorrectAnswers;

    return (
        <div className="testSection" >
            <div className="score">
                <div className="score__element">
                    <h4>Prawidłowe odpowiedzi: </h4>
                    <div>{points}</div>
                </div>
                <div className="score__element">
                    <h4>Punkty łącznie: </h4>
                    <div>{storagePoints}</div>
                </div>
                <div className="score__element">
                    <h4>Nieprawidłowe odpowiedzi </h4>
                    <div>{incorrectAnswers}</div>
                </div>
                <div className="score__element--button">
                    <div>Zobacz nieprawidlowe odpowiedzi</div>
                    <div>Zrób powtórkę </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Score;