import React, { useContext, useState } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import GetAnswers from '../functions/getAnswers.js';
import playSound from '../../sounds/sounds.js';
import speak from '../../sounds/speaker.js';
import speaker from '../../img/speaker.svg';


const TestRepeatTest = (props) => {
    //const setContent = useContext(MainContentContext);
    const words = props.words;
    const getDictionary = useContext(DictionaryContext);
    const getSettings = useContext(SettingsContext);
    //const setContent = useContext(MainContentContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const currentWord = props.currentWord;
    const sentence = dictionary[props.currentWord].examples[1][0];
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;

    const noWordToRepeat = () => {
        return (
            <div>
                You have no words to repeat :)
            </div>
        )
    }

    // state - to testTwo
    const [testTwoState, setTestTwo] = useState({
        inputValue: "",
        rightAnswer: "",
        readOnly: false,
    });

    // state modification - to testTwo
    const changetestTwo = (action, set) => {
        if (action === "readOnly") {
            setTestTwo({...testTwoState, readOnly: set });
        }
        if (action === "setInputValue") {
            setTestTwo({...testTwoState, inputValue: set, rightAnswer: "" });
        }
        if (action === "next") {
            setTestTwo({...testTwoState, inputValue: "", rightAnswer: "", readOnly: false, pointsAdded: false });
        }
    }

    // function to testFour
    let displaySentence = sentence.split(" ").map(word => {
        if (word === dictionary[props.currentWord].word) {
            word = "______";
        }
        return word;
    });
    displaySentence = displaySentence.join(" ");

    // to all tests
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
                            props.testRepeat("setCurrentWord", 1);
                            changetestTwo("next");
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
        return (
            <div>
                <h2 className="readingSection__word">{words[currentWord][0].word}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
                {navigation}
            </div>
        )
    }

    const testTwo = () => {
        return (
            <div>
                <h2 className="readingSection__word">{words[currentWord][0].translation}</h2>
                <div className="readingSection__answers">
                    <form>
                        <label htmlFor="write-in-english">Napisz po angielsku:</label><br/>
                        <input type="text" name="write-in-english" value={testTwoState.inputValue} onChange={(e)=> changetestTwo("setInputValue", e.target.value)}
                            style={{borderColor: props.rightAnswer}} className="text-input" readOnly={testTwoState.readOnly}/>
                        <div className="input-button" onClick={() => {
                            props.testRepeat("choosenAnswer", testTwoState.inputValue, "word");
                            changetestTwo("readOnly", true);
                        }}>Check answer</div>
                    </form>
                </div>
                {navigation}
            </div>
        )
    }

    const testThree = () => {
        if (props.choosenAnswer === "none") {
            speak(words[currentWord][0].word, language, speakRate);
        }
        return (
            <div>
                <h2 className="readingSection__word" style={{ marginBottom: 0}}>{words[currentWord][0].spelling}</h2>
                <img src={speaker} alt="speaker icon - press and listen" className="speaker-icon"
                            onClick={() => speak(words[currentWord][0].word, language, speakRate)}/>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                           changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
                {navigation}
            </div>
        )
    }

    const testFour = () => {
        return (
            <div>
                <h2 className="readingSection__word">{displaySentence}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                           changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
                {navigation}
            </div>
        )
    }

    const testFive = () => {
        return (
            <div>
                <h2 className="readingSection__word">{words[currentWord][0].translation}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
                {navigation}
            </div>
        )
    }
    
    // number of test for word in repetition
    let displayContent;
    if (words.length > 0)  {
        if (props.words[currentWord][1] === 0) {
            displayContent = testOne();
        }
        if (props.words[currentWord][1] === 1) {
            displayContent = testTwo();
        }
        if (props.words[currentWord][1] === 2) {
            displayContent = testThree();
        }
        if (props.words[currentWord][1] === 3) {
            displayContent = testFour();
        }
        if (props.words[currentWord][1] === 4) {
            displayContent = testFive();
        }
    } else {
        displayContent = noWordToRepeat();
    }
    

    return (
        <div>
            {displayContent}
        </div>
    )
}

export default TestRepeatTest;