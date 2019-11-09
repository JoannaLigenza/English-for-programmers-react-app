import React, {useState, useContext, useEffect} from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import TestRepeatLesson from './testRepeatLesson.js';
import TestRepeatTest from './testRepeatTest.js';
import TestOne from './testOne.js';
import TestTwo from './testTwo.js';
import TestThree from './testThree.js';
import TestFour from './testFour.js';
import TestFive from './testFive.js';

const TestRepeat = () => {
    const words = JSON.parse(localStorage.getItem("repetitionWords"));
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const setContent = useContext(MainContentContext);
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;
    

    //state
    const [repetition, setRepetition] = useState({
        content: TestRepeatLesson,
        currentWord: 0,
        choosenAnswer: "none",
        rightAnswer: "grayColor",
    });
    
    const testRepeat = (option, set, translate) => {
        if (option === "setContent") {
            setRepetition({...repetition, content: set, currentWord: 0, rightAnswer: "grayColor", choosenAnswer: "none"});
        }
        if (option === "setCurrentWord") {
            let currentWord = repetition.currentWord;
            if (repetition.rightAnswer !== "greenColor") {
                currentWord = repetition.currentWord + set;
            }
            setRepetition({...repetition, currentWord: currentWord, choosenAnswer: "none", rightAnswer: "grayColor"});
        }
        if (option === "choosenAnswer") {
            let rightAnswer = "redColor";
            // here can be: dictionary[words.currentWord].words or dictionary[words.currentWord].translation
            if (set === words[repetition.currentWord][0][translate]) {
                rightAnswer = "greenColor";
            }
            setRepetition({...repetition, choosenAnswer: set, rightAnswer: rightAnswer });
        }
    }

    useEffect(() => {
        if (words.length !== 0) {
            let answers;
            if (repetition.choosenAnswer === "none") {
                // choose 6 random answers
                answers = chooseAnswers(repetition.currentWord, dictionary, numberOfAnswers, "translation", words);
            } else {
                // get actual choosen answer from mainContext
                answers = actualAnswers;
            }
            // saving answers in mainContentContext
            setContent.changeContent("actualAnswers", answers);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repetition.choosenAnswer]);
    
    const RepetitionContent = repetition.content;

    return (
        <div className="testSection" >
            <h3>Repetition</h3>
            <div className="repetiton-option">
                <button className="repetition__button--lesson" onClick={() => testRepeat("setContent", TestRepeatLesson)}>Lesson</button>
                <button className="repetition__button--test" onClick={() => testRepeat("setContent", TestRepeatTest)}>Test</button>
            </div> 
            <div className="repetition-content">
                <RepetitionContent currentWord={repetition.currentWord} testRepeat={testRepeat} TestRepeatTest={TestRepeatTest} 
                TestRepeatLesson={TestRepeatLesson} choosenAnswer={repetition.choosenAnswer} 
                rightAnswer={repetition.rightAnswer} words={words} />
            </div>
        </div>
    )
}

export default TestRepeat;