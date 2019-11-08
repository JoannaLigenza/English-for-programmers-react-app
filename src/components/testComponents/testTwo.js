import React, { useContext, useState } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import TestNavigation from './testNavigation.js';
import playSound from '../../sounds/sounds.js';

const TestTwo = (props) => {
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;

    // state
    const [testTwo, setTestTwo] = useState({
        inputValue: "",
        rightAnswer: "",
        readOnly: false,
        pointsAdded: false
    });

    // state modification
    const changetestTwo = (action, set) => {
        if (action === "rightAnswer") {
            // if answer is correct
            if (dictionary[props.currentWord].word === testTwo.inputValue) {
                // if there are no points added yet after clicking check button and tested word is not passed then add point
                if (!testTwo.pointsAdded && dictionary[props.currentWord].passed === "") {
                    getDictionary.changeDictionaryData("points", "yes", dictionary[props.currentWord].id);
                }
                setTestTwo({...testTwo, rightAnswer: "greenColor", readOnly: true, pointsAdded: true });
                props.changeWord("choosenAnswer", testTwo.inputValue, "word");
            } else {
                setTestTwo({...testTwo, rightAnswer: "redColor", readOnly: true });
                props.changeWord("choosenAnswer", testTwo.inputValue, "word");
                getDictionary.changeDictionaryData("points", "no", dictionary[props.currentWord].id);
            }
        }
        if (action === "setInputValue") {
            setTestTwo({...testTwo, inputValue: set, rightAnswer: "" });
        }
        if (action === "next") {
            setTestTwo({...testTwo, inputValue: "", rightAnswer: "", readOnly: false, pointsAdded: false });
        }
    }

    const borderColor = () => {
        let borderColor = "gray";
        if (testTwo.rightAnswer === "greenColor") {
            borderColor = "green";
            playSound("rightSound");
        }
        if (testTwo.rightAnswer === "redColor") {
            borderColor = "red";
            playSound("wrongSound");
        }
        return borderColor;
    }
    
    return (
        <div className="testSection" >
           <h2 className="readingSection__word">{dictionary[props.currentWord].translation}</h2>
           <div className="readingSection__answers">
                <form>
                    <label htmlFor="write-in-english">Napisz po angielsku:</label><br/>
                    <input type="text" name="write-in-english" value={testTwo.inputValue} onChange={(e)=> changetestTwo("setInputValue", e.target.value)}
                        style={{borderColor: borderColor()}} className="text-input" readOnly={testTwo.readOnly}/>
                    <div className="input-button" onClick={() => changetestTwo("rightAnswer")}>Check answer</div>
                </form>
            </div>
            <TestNavigation currentWord={props.currentWord} changeWord={props.changeWord} changetestTwo={changetestTwo}
                displayTo={props.displayTo} rightAnswer={props.rightAnswer} actualTestNumber={props.actualTestNumber} />
        </div>
    )
}

export default TestTwo;