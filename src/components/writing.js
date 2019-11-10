import React, { useState } from 'react';
import LessonNavigation from './lessonNavigation.js';
import playSound from '../sounds/sounds.js';

const Writing = (props) => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const getSettings = props.getSettings;
    const dictionary = props.dictionary;
    const wordsInLesson = getSettings.settings.wordsInLesson;

    // state
    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*wordsInLesson,
        answer: "",
        inputValue: "",
        rightAnswer: "",
    });

    // state modification
    const changeWord = (action, set) => {
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, rightAnswer: "", inputValue: ""});
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

    if (words.currentWord > (dictionary.length-1)) {
        return (
            <div className="all-tests-passed">
                Congratulations, you have passed all tests! :)
            </div>
        )
    }

    return (
        <div className="readingSection">
            <h2 className="readingSection__word">{dictionary[words.currentWord].translation}</h2>
            <div className="readingSection__answers">
                <form>
                    <label htmlFor="write-in-english">Napisz po angielsku:</label><br/>
                    <input type="text" name="write-in-english" value={words.inputValue} onChange={(e)=> changeWord("setInputValue", e.target.value)}
                        style={{borderColor: borderColor()}} className="text-input" />
                    <div className="input-button" onClick={() => changeWord("rightAnswer")}>Check answer</div>
                </form>
            </div>
            <LessonNavigation words={words} changeWord={changeWord} displayFrom={props.displayFrom} displayTo={props.displayTo} 
                setContent={props.setContent} visibility={props.visibility} goToOverlap="Test" buttonText="Go to test"
                displayLeftArrow="no" getSettings={getSettings} displayLoudSpeaker="no"/>
        </div>
    )
}

export default Writing;