import React, { useContext, useState } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import TestNavigation from './testNavigation.js';
import playSound from '../../sounds/sounds.js';

const TestTwo = (props) => {
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;

    // state
    const [testTwo, setestTwo] = useState({
        inputValue: "",
        rightAnswer: "",
        readOnly: false
    });

    // state modification
    const changetestTwo = (action, set) => {
        if (action === "rightAnswer") {
            if (dictionary[props.currentWord].word === testTwo.inputValue) {
                setestTwo({...testTwo, rightAnswer: "greenColor", readOnly: true });
                props.changeWord("choosenAnswer", testTwo.inputValue, "word");
                getDictionary.changeDictionaryData("points");
            } else {
                setestTwo({...testTwo, rightAnswer: "redColor", readOnly: true });
                props.changeWord("choosenAnswer", testTwo.inputValue, "word");
            }
        }
        if (action === "setInputValue") {
            setestTwo({...testTwo, inputValue: set, rightAnswer: "" });
        }
        if (action === "next") {
            setestTwo({...testTwo, inputValue: "", rightAnswer: "", readOnly: false });
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
    console.log("read only ", testTwo.readOnly);
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
                displayTo={props.displayTo} />
        </div>
    )
}

export default TestTwo;