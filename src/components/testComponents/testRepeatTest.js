import React, { useContext, useState } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import GetAnswers from '../functions/getAnswers.js';
import playSound from '../../sounds/sounds.js';
import speak from '../../sounds/speaker.js';
import speaker from '../../img/speaker.svg';


const TestRepeatTest = (props) => {
    const words = props.words;
    const getDictionary = useContext(DictionaryContext);
    const getSettings = useContext(SettingsContext);
    const setContent = useContext(MainContentContext);
    const currentWord = props.currentWord;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;
    let oneWord;
    let sentence;

    if (words.length > 0) {        
        // if - this component is used by favourites test component, else - it is used by repetition test component
        // favourites is array with objects, repetition is multidimensional array
        if (props.isFavourites !== undefined) {
            oneWord = words[currentWord]; 
            sentence = words[currentWord].examples[1][0];
        } else {
            oneWord = words[currentWord][0]; 
            sentence = words[currentWord][0].examples[1][0];
        }
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
        if (word === oneWord.word) {
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
                                // if this component is used by repetition component, then delete word from repetitonWords array,
                                // if it is used by favourites components, then don't remove anything
                                if (props.isFavourites === undefined) {
                                    // arguments: name of option, current word (number), word from repetitionWords array (object)
                                    getDictionary.changeDictionaryData("notPassedWordsRemove", currentWord, oneWord);
                                }
                            }
                            // if it's not test of favourites words, but repeat test, set content to repeatLesson
                            if (props.isFavourites === undefined) {
                                props.testRepeat("setContent", props.TestRepeatLesson);
                            } else {
                                setContent.changeContent("setContentInOverlap", "Test");
                            }
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
                                // if this component is used by repetition component, then delete word from repetitonWords array,
                                // if it is used by favourites components, then don't remove anything
                                if (props.isFavourites === undefined) {
                                    // arguments: name of option, current word (number), word from repetitionWords array (object)
                                    getDictionary.changeDictionaryData("notPassedWordsRemove", currentWord, oneWord);
                                }
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
                <h2 className="readingSection__word">{oneWord.word}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words} isFavourites={props.isFavourites}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes" />
                {navigation}
            </div>
        )
    }

    const testTwo = () => {
        let borderColor = "gray"
        if (props.rightAnswer === "redColor"){
            borderColor = "red";
            playSound("wrongSound");
        }
        if (props.rightAnswer === "greenColor"){
            borderColor = "green";
            playSound("rightSound");
        }
        return (
            <div>
                <h2 className="readingSection__word">{oneWord.translation}</h2>
                <div className="readingSection__answers">
                    <form>
                        <label htmlFor="write-in-english">Napisz po angielsku:</label><br/>
                        <input type="text" name="write-in-english" value={testTwoState.inputValue} onChange={(e)=> changetestTwo("setInputValue", e.target.value)}
                            style={{borderColor: borderColor}} className="text-input" readOnly={testTwoState.readOnly}/>
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
            speak(oneWord.word, language, speakRate);
        }
        return (
            <div>
                <h2 className="readingSection__word" style={{ marginBottom: 0}}>{oneWord.spelling}</h2>
                <img src={speaker} alt="speaker icon - press and listen" className="speaker-icon"
                            onClick={() => speak(oneWord.word, language, speakRate)}/>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words} isFavourites={props.isFavourites}
                           changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
                {navigation}
            </div>
        )
    }

    const testFour = () => {
        return (
            <div>
                <h2 className="readingSection__word">{displaySentence}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words} isFavourites={props.isFavourites}
                           changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
                {navigation}
            </div>
        )
    }

    const testFive = () => {
        return (
            <div>
                <h2 className="readingSection__word">{oneWord.translation}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words} isFavourites={props.isFavourites}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
                {navigation}
            </div>
        )
    }

    const content = () => {
        let displayContent;
        if (props.testNumber === 0) {
            displayContent = testOne();
        }
        if (props.testNumber === 1) {
            displayContent = testTwo();
        }
        if (props.testNumber === 2) {
            displayContent = testThree();
        }
        if (props.testNumber === 3) {
            displayContent = testFour();
        }
        if (props.testNumber === 4) {
            displayContent = testFive();
        }
        return displayContent;
    }
    
    // number of test for word in repetition
    const displayContent = content();
    
    return (
        <div>
            {displayContent}
        </div>
    )
}

export default TestRepeatTest;