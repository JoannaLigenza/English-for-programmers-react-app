import React, { useContext, useState } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import { VisibilityContext } from '../../contexts/VisibilityContext.js';
import TestNavigation from './testNavigation.js';
import TestOne from './testOne.js';
import TestTwo from './testTwo.js';
import TestThree from './testThree.js';
import TestFour from './testFour.js';
import TestFive from './testFive.js';

const TestWords = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const actualAnswers = setContent.content.actualAnswers;
    const actualTest = setContent.content.actualTest;
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
        actualAnswers: actualAnswers
    });

    // state modification
    const changeWord = (action, set, translate) => {
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, choosenAnswer: "none", rightAnswer: "grayColor" });
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
    }

    const actualContent = () => {
        let displayContent;
        if (actualTest === "") {
            const testNumber = Math.floor(Math.random()*5);
            const content = {
                testOne: TestOne,
                testTwo: TestTwo,
                testThree: TestThree,
                testFour: TestFour,
                testFive: TestFive,
            }
            displayContent = content.testThree;
            // if (testNumber  === 0) {
            //     displayContent = content.testOne;
            // } else if (testNumber  === 1) {
            //     displayContent = content.testTwo;
            // } else if (testNumber  === 2) {
            //     displayContent = content.testThree;
            // } else if (testNumber  === 3) {
            //     displayContent = content.testFour;
            // } else if (testNumber  === 4) {
            //     displayContent = content.testFive;
            // }
            setContent.changeContent("actualTest", displayContent, testNumber);
           // console.log("none actualTest ", actualTest);
        } else {
            //console.log("jes actualTest ", actualTest);
            displayContent = actualTest;
            //console.log("not none")
        }
        return displayContent;
    }
    
    let DisplayContent = actualContent();


    return (
        <div className="testSection" >
            <div>{getDictionary.dictionaryData.points}</div>
            <DisplayContent currentWord={words.currentWord} choosenAnswer={words.choosenAnswer} actualAnswers={words.actualAnswers} 
            changeWord={changeWord} rightAnswer={words.rightAnswer} displayTo={displayTo} />
            <TestNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                setContent={setContent} visibility={visibility} goToOverlap="Test" buttonText="Zobacz wynik"
                displayLeftArrow="no" getSettings={getSettings} rightAnswer={words.rightAnswer} displayLoudSpeaker="no"/>
        </div>
    )
}

export default TestWords;