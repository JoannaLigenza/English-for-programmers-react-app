import React, { useState, useContext } from 'react';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import LessonNavigation from './lessonNavigation.js';


const Reading = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }
    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*wordsInLesson,
        answer: "plik",
        choosenAnswer: "none",
        rightAnswer: "grayColor",
    });

    const changeWord = (action, set) => {
        // if (action === "prev") {
        //     setWords({...words, currentWord: words.currentWord - 1 })
        // }
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, choosenAnswer: "grayColor", });
        }
        if (action === "choosenAnswer") {
            let rightAnswer = "redColor";
            if (set === dictionary[words.currentWord].translation) {
                rightAnswer = "greenColor";
            }
            setWords({...words, choosenAnswer: set, rightAnswer: rightAnswer });
        }
    }
    const chooseAnswers = () => {
        const firstWord = words.currentWord;
        const answers = [];
        for (let i=0; i < 6; i++) {
            let word = dictionary[firstWord+i];
            const random = Math.floor(Math.random()*(dictionary.length-1));
            if (word === undefined) {
                word = dictionary[random]; 
            }
            answers.push(word.translation);
        }
        return answers;
    }
    let answers = chooseAnswers();
    answers = answers.map( (answer, index) => {
        console.log(words.rightAnswer, words.choosenAnswer, answer);
        return <div key={index} onClick={() => changeWord("choosenAnswer", answer)}
                    className={ words.choosenAnswer === answer ? "oneAnswer-button oneAnswer-button--pressed" : "oneAnswer-button"}>
                <p className={ words.choosenAnswer === answer ? words.rightAnswer : "grayColor" } >
                    {answer}
                </p>
            </div>
    })
    
    return (
        <div className="readingSection">
            <h2 className="readingSection__word">{dictionary[words.currentWord].word}</h2>
            <div className="readingSection__answers">
                {answers}
            </div>
            <LessonNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                setContent={setContent} visibility={visibility} goToOverlap="Listening" buttonText="Go practice"
                displayLeftArrow="no" />
        </div>
    )
}

export default Reading;