import React, { useContext, useState, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import TestOne from './testOne.js';
import TestTwo from './testTwo.js';
import TestThree from './testThree.js';
import TestFour from './testFour.js';
import TestFive from './testFive.js';

const TestWords = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const actualAnswers = setContent.content.actualAnswers;
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
        choosenAnswer: "none",
        rightAnswer: "grayColor",
        actualAnswers: actualAnswers,
        actualTest: "",
    });

    // state modification
    const changeWord = (action, set, translate) => {
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, choosenAnswer: "none", rightAnswer: "grayColor", actualTest: "" });
            setContent.changeContent("actualTest", "");
        }
        if (action === "choosenAnswer") {
            let rightAnswer = "redColor";
            // here can be: dictionary[words.currentWord].words or dictionary[words.currentWord].translation
            if (set === dictionary[words.currentWord][translate]) {
                rightAnswer = "greenColor";
            }
            setWords({...words, choosenAnswer: set, rightAnswer: rightAnswer });
        }
        if (action === "actualAnswers") {
            setWords({...words, actualAnswers: set });
        }
        if (action === "actualTest") {
            setWords({...words, actualTest: set });
        }
    }

    useEffect(() => {
        if (words.actualTest === "") {
            let displayContent;
            const testNumber = Math.floor(Math.random()*5);
            if (testNumber  === 0) {
                displayContent = TestOne;
            } else if (testNumber  === 1) {
                displayContent = TestTwo;
            } else if (testNumber  === 2) {
                displayContent = TestThree;
            } else if (testNumber  === 3) {
                displayContent = TestFour;
            } else if (testNumber  === 4) {
                displayContent = TestFive;
            }
            changeWord("actualTest", displayContent);
        }         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.actualTest]);

    let DisplayContent = words.actualTest;

    if (words.actualTest === "") {
        DisplayContent = TestOne;
    }


    return (
        <div className="testSection" >
            <div>{getDictionary.dictionaryData.points}</div>
            <DisplayContent currentWord={words.currentWord} choosenAnswer={words.choosenAnswer} actualAnswers={words.actualAnswers} 
            changeWord={changeWord} rightAnswer={words.rightAnswer} displayTo={displayTo} />
        </div>
    )
}

export default TestWords;