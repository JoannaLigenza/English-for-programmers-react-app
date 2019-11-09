import React, { useContext, useEffect } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import GetAnswers from '../functions/getAnswers.js';
import playSound from '../../sounds/sounds.js';


const TestRepeatTest = (props) => {
    //const setContent = useContext(MainContentContext);
    const words = props.words;
    const getDictionary = useContext(DictionaryContext);
    const setContent = useContext(MainContentContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const currentWord = props.currentWord;
    console.log("words.length ", words.length, currentWord);
    const noWordToRepeat = () => {
        return (
            <div className="mainContent" >
                You have no words to repeat :)
            </div>
        )
    }   
    if (words.length === 0)  {
        noWordToRepeat();
    }    

    const setNavigation = () => {
        return (
            <div className="navigation">
                {/* Go to repetition Lesson Button */}
                <div className="button button--goToTest" style={{display: currentWord === words.length-1 ? "block" : "none"}}
                    onClick={ () => {
                        // if answer was choosen go to TestRepeatLesson, else play wrong sound
                        if (props.rightAnswer !== "grayColor") {
                            // if choosen answer is right answer then delete this word from repetitionWords array
                            if (props.rightAnswer === "greenColor") {
                                getDictionary.changeDictionaryData("notPassedWordsRemove", currentWord);
                            }
                            props.testRepeat("setContent", props.TestRepeatLesson);
                            getDictionary.changeDictionaryData("notPassedWordsZero");
                        } else {
                            playSound("wrongSound");
                        }
                    }}>
                    Go to repetition Lesson
                </div>
                {/* Arrow Right */}
                <div className="navigation--right" onClick={ () => {
                        if (props.rightAnswer !== "grayColor") {
                            // if choosen answer is right answer then delete this word from repetitionWords array
                            if (props.rightAnswer === "greenColor") {
                                getDictionary.changeDictionaryData("notPassedWordsRemove", currentWord);
                            }
                            props.testRepeat("setCurrentWord", 1)
                        } else {
                            playSound("wrongSound");
                        }
                    }}
                    style={{visibility: currentWord === words.length-1 ? "hidden" : "visible"}}>
                    Next
                </div>
            </div>
        )
    }
    const navigation = setNavigation();

    const testOne = () => {
        // if (words[currentWord] === undefined) {         // sprawdz to !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //     return noWordToRepeat();
        // }
        return (
            <div className="testSection" >
                <h2 className="readingSection__word">{words[currentWord][0].word}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
                {navigation}
            </div>
        )
    }

    // number of test for word in repetition
    let displayContent = testOne();
    // if (props.words[currentWord][1] === 1) {
    //     displayContent = testOne();
    // }
    

    return (
        <div className="testSection" >
            {displayContent}
        </div>
    )
}

export default TestRepeatTest;