import React, {useState, useContext, useEffect} from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import TestRepeatLesson from './testRepeatLesson.js';
import TestRepeatTest from './testRepeatTest.js';

const TestRepeat = (props) => {
    let words = JSON.parse(localStorage.getItem("repetitionWords"));
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const setContent = useContext(MainContentContext);
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;

    let content = TestRepeatLesson;
    if (props.whichTest === "favourites") {
        words = JSON.parse(localStorage.getItem("favourites"));
    }

    //state
    const [repetition, setRepetition] = useState({
        content: content,
        currentWord: 0,
        choosenAnswer: "none",
        rightAnswer: "grayColor",
        testNumber: ""
    });

    let oneWord;
    if (words.length !== 0) {
        if (props.whichTest === "repetition") {
            oneWord = words[repetition.currentWord][0];
        }
        if (props.whichTest === "favourites") {
            oneWord = words[repetition.currentWord];
        }
    }
    
    // set state
    const testRepeat = (option, set, translate) => {
        if (option === "setContent") {
            setRepetition({...repetition, content: set, currentWord: 0, rightAnswer: "grayColor", choosenAnswer: "none"});
        }
        if (option === "setCurrentWord") {
            let currentWord = repetition.currentWord;
            if (props.whichTest === "repetition") {
                if (repetition.rightAnswer !== "greenColor") {
                    currentWord = repetition.currentWord + set;
                }
            }
            if (props.whichTest === "favourites") {
                currentWord = repetition.currentWord + set;
            }
            setRepetition({...repetition, currentWord: currentWord, choosenAnswer: "none", rightAnswer: "grayColor"});
        }
        if (option === "choosenAnswer") {
            let rightAnswer = "redColor";
            // here can be: dictionary[words.currentWord].words or dictionary[words.currentWord].translation
            if (set === oneWord[translate]) {
                rightAnswer = "greenColor";
            }
            setRepetition({...repetition, choosenAnswer: set, rightAnswer: rightAnswer });
        }
        if (option === "testNumber") {
            setRepetition({...repetition, testNumber: set});
        }
    }

    useEffect(() => {
        if (words.length !== 0) {
            let answers;
            let testNumber;
            if (props.whichTest === "repetition") {
                testNumber = words[repetition.currentWord][1];
            }
            if (props.whichTest === "favourites") {
                const randomTest = Math.floor(Math.random()*5);
                testNumber = randomTest;
            }
            if (repetition.rightAnswer === "grayColor") {
                testRepeat("testNumber", testNumber);
            }

            if (repetition.choosenAnswer === "none") {
                // choose 6 random answers
                if (testNumber === 0) {
                    answers = chooseAnswers(repetition.currentWord, dictionary, numberOfAnswers, "translation", words, props.whichTest);
                }
                if (testNumber === 1) {
                    //testTwo doesn't have random answers, it has writing answer
                    answers = "";
                }
                if (testNumber === 2) {
                    answers = chooseAnswers(repetition.currentWord, dictionary, numberOfAnswers, "translation", words, props.whichTest);
                }
                if (testNumber === 3) {
                    answers = chooseAnswers(repetition.currentWord, dictionary, numberOfAnswers, "word", words, props.whichTest);
                }
                if (testNumber === 4) {
                    answers = chooseAnswers(repetition.currentWord, dictionary, numberOfAnswers, "word", words, props.whichTest);
                } 
            } else {
                // get actual choosen answer from mainContext
                answers = actualAnswers;
            }
            // saving answers in mainContentContext
            setContent.changeContent("actualAnswers", answers);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [repetition.choosenAnswer]);
    
    // RepetitionContent - content load in repetition section (load lesson or test)
    const RepetitionContent = repetition.content;

    // return:
    // - info about no words to repeat, or
    // - repetition section (lesson or test), or
    // - favourites test section
    const setTestContent = () => {
        if (words.length === 0) {
            return (
                <div className="testSection no-repeat">
                    You have no words to repeat :) <br/><br/>
                    Nie masz słów do powtórzenia :)
                </div>
            )
        } else {
            if (props.whichTest === "repetition") {
                return (
                    <div className="testSection" >
                        <h3>Repetition</h3>
                        <div className="repetiton-option">
                            <button onClick={() => testRepeat("setContent", TestRepeatLesson)}
                                className={repetition.content === TestRepeatLesson ? "repetition__button repetition__button-clicked" : "repetition__button" }>
                                Lesson
                            </button>
                            <button onClick={() => testRepeat("setContent", TestRepeatTest)}
                                className={repetition.content === TestRepeatTest ? "repetition__button repetition__button-clicked" : "repetition__button" }>
                                Test
                            </button>
                        </div> 
                        <div className="repetition-content">
                            <RepetitionContent currentWord={repetition.currentWord} testRepeat={testRepeat} TestRepeatTest={TestRepeatTest}
                            TestRepeatLesson={TestRepeatLesson} choosenAnswer={repetition.choosenAnswer} 
                            rightAnswer={repetition.rightAnswer} words={words} testNumber={repetition.testNumber}/>
                        </div>
                    </div>
                )
            }

            if (props.whichTest === "favourites") {
                return (
                    <div className="testSection" >
                        <h3>Test your favourites words</h3>
                        <div className="repetition-content">
                            <TestRepeatTest currentWord={repetition.currentWord} testRepeat={testRepeat} choosenAnswer={repetition.choosenAnswer} 
                            rightAnswer={repetition.rightAnswer} words={words} testNumber={repetition.testNumber} isFavourites={words}
                            TestRepeatTest={TestRepeatTest} />
                        </div>
                    </div>
                )
            }
        }
    }
    const testContent = setTestContent();

    return (
        <div>
            { testContent }
        </div>
        
    )
}

export default TestRepeat;