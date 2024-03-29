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
                onClick={ async () => {
                    // if answer is incorrect, write it to notPassedWords array
                    if (props.rightAnswer !== "greenColor") {
                        await getDictionary.changeDictionaryData("notPassedWords", dictionary[props.currentWord], props.actualTestNumber );
                        getDictionary.changeDictionaryData("passed", "no", dictionary[props.currentWord].id );
                    } else {
                        getDictionary.changeDictionaryData("passed", "yes", dictionary[props.currentWord].id );
                    }
                    // load score component
                    setContent.changeContent("setContentInOverlap", "Score");
                    // count points from test
                    const storagePoints = await JSON.parse(localStorage.getItem("points"));
                    const points = getDictionary.dictionaryData.points;
                    const allPoints = await storagePoints + points;
                    // save points in localstorage
                    localStorage.setItem("points", JSON.stringify(allPoints));
                    getDictionary.changeDictionaryData("repetitionWords");
                }}>
                Zobacz wynik
            </div>
            <div className="navigation--right" onClick={async () => {
                    if (props.changetestTwo !== undefined) {
                        props.changetestTwo("next");
                    }
                    // if test loop ends then set another loop, unless it is the last loop, then hide arrow
                    if (props.currentWord === (props.displayTo )) {
                        props.changeWord("currentWord");
                        // add another test loop
                        setContent.changeContent("testLoop");
                        // if answer is incorrect, write it to notPassedWords array
                        if (props.rightAnswer !== "greenColor") {
                            await getDictionary.changeDictionaryData("notPassedWords", dictionary[props.currentWord], props.actualTestNumber );
                            getDictionary.changeDictionaryData("passed", "no", dictionary[props.currentWord].id );
                        } else {
                            getDictionary.changeDictionaryData("passed", "yes", dictionary[props.currentWord].id );
                        }
                    } else {
                        if (props.rightAnswer !== "greenColor") {
                            await getDictionary.changeDictionaryData("notPassedWords", dictionary[props.currentWord], props.actualTestNumber );
                            getDictionary.changeDictionaryData("passed", "no", dictionary[props.currentWord].id );
                        } else {
                            getDictionary.changeDictionaryData("passed", "yes", dictionary[props.currentWord].id );
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