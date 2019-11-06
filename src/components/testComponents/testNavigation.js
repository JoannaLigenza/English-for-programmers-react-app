import React, { useContext } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';

const TestNavigation = (props) => {
    const setContent = useContext(MainContentContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const testEachWordXTimes = setContent.content.testEachWordXTimes;
    const testLoop = setContent.content.testLoop;
    return (
        <div className="navigation">
            <div className="button button--goToTest" 
                style={{display: (props.currentWord >= props.displayTo && testLoop >= testEachWordXTimes) ? "block" : "none"}}
                onClick={() => {
                    // if answer is incorrect, write it to notPassedWords array (in repetitionWords option) and then write all incorrect answers in storage
                    if (props.rightAnswer !== "greenColor") {
                        getDictionary.changeDictionaryData("repetitionWords", dictionary[props.currentWord].word, props.actualTestNumber );
                    } else {
                        getDictionary.changeDictionaryData("repetitionWords");
                    }
                    // load score component
                    setContent.changeContent("setContentInOverlap", "Score");
                    // count points from test
                    const storagePoints = JSON.parse(localStorage.getItem("points"));
                    const incorrectAnswers = getDictionary.dictionaryData.notPassedWords.length;
                    const points = setContent.content.numberOfAnswers - incorrectAnswers;
                    const allPoints = storagePoints + points;
                    // save points in localstorage
                    localStorage.setItem("points", JSON.stringify(allPoints));
                }}>
                Zobacz wynik
            </div>
            <div className="navigation--right" onClick={() => {
                    if (props.changetestTwo !== undefined) {
                        props.changetestTwo("next");
                    }
                    // if test loop ends then set another loop
                    if (props.currentWord === (props.displayTo )) {
                        props.changeWord("currentWord");
                        // add another test loop
                        setContent.changeContent("testLoop");
                        // if answer is incorrect, write it to notPassedWords array
                        if (props.rightAnswer !== "greenColor") {
                            getDictionary.changeDictionaryData("notPassedWords", dictionary[props.currentWord].word, props.actualTestNumber );
                        }
                    } else {
                        if (props.rightAnswer !== "greenColor") {
                            getDictionary.changeDictionaryData("notPassedWords", dictionary[props.currentWord].word, props.actualTestNumber );
                        }
                        // go to the next word in test
                        props.changeWord("next");
                    }
                }}
                // if it is the last word from lesson and the last loop then hide arrow
                style={{visibility: (props.currentWord >= props.displayTo && testLoop >= testEachWordXTimes) ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default TestNavigation;