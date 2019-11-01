import React, { useState, useContext, useEffect } from 'react';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import LessonNavigation from './lessonNavigation.js';
import playSound from '../sounds/sounds.js';

const Writing = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    //const actualAnswers = setContent.content.actualAnswers;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }

    // state
    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*wordsInLesson,
        answer: "",
        inputValue: "",
        rightAnswer: "",
        //actualAnswers: actualAnswers
    });

    // state modification
    const changeWord = (action, set) => {
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, rightAnswer: ""});
        }
        if (action === "rightAnswer") {
            if (dictionary[words.currentWord].word === words.inputValue) {
                setWords({...words, rightAnswer: "yes" });
            } else {
                setWords({...words, rightAnswer: "no" });
            }
        }
        if (action === "setInputValue") {
            setWords({...words, inputValue: set, rightAnswer: "" });
        }
    }

    const borderColor = () => {
        let borderColor = "gray";
        if (words.rightAnswer === "yes") {
            borderColor = "green";
            playSound("rightSound");
        }
        if (words.rightAnswer === "no") {
            borderColor = "red";
            playSound("wrongSound");
        }
        return borderColor;
    }

    useEffect(() => {
        console.log("test zmieniam sie")
    }, [words.rightAnswer]);

    console.log("wrw ", words.inputValue, words.rightAnswer)
    return (
        <div className="readingSection">
            <h2 className="readingSection__word">{dictionary[words.currentWord].translation}</h2>
            <div className="readingSection__answers">
                <form>
                    <label htmlFor="write-in-english">Napisz po angielsku:</label><br/>
                    <input type="text" name="write-in-english" onChange={(e)=> changeWord("setInputValue", e.target.value)}
                        style={{borderColor: borderColor()}} className="text-input" />
                    <div className="input-button" onClick={() => changeWord("rightAnswer")}>Check answer</div>
                </form>
            </div>
            <LessonNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                setContent={setContent} visibility={visibility} goToOverlap="Test" buttonText="Go to test"
                displayLeftArrow="no" getSettings={getSettings} displayLoudSpeaker="no"/>
        </div>
    )
}

export default Writing;