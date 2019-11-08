import React, { useContext } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import GetAnswers from '../functions/getAnswers.js';


const TestRepeatTest = (props) => {
    //const setContent = useContext(MainContentContext);
    const words = JSON.parse(localStorage.getItem("repetitionWords"));
    const currentWord = props.currentWord;

    if (words.length === 0)  {
        return (
            <div className="mainContent" >
                You have no words to repeat :)
            </div>
        )
    }

    const setNavigation = () => {
        return (
            <div className="navigation">
                {/* Go to Test Button */}
                <div className="button button--goToTest" style={{display: currentWord === words.length-1 ? "block" : "none"}}
                    onClick={() => props.testRepeat("setContent", props.TestRepeatTest) }>
                    Well Done!
                </div>
                {/* Arrow Right */}
                <div className="navigation--right" onClick={() => props.testRepeat("setCurrentWord", 1) }
                    style={{visibility: currentWord === words.length-1 ? "hidden" : "visible"}}>
                    Next
                </div>
            </div>
        )
    }
    const navigation = setNavigation();

    let DisplayContent = props.actualTest;

    if (DisplayContent === "one") {
        return (
            <div className="testSection" >
                <h2 className="readingSection__word">{words[currentWord][0].word}</h2>
                <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer} isRepetitionTest={words}
                            changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
                {navigation}
            </div>
        )
    }

    return (
        <div className="testSection" >
            <h2 className="readingSection__word">{words[currentWord][0].word}</h2>
            <GetAnswers currentWord={currentWord} choosenAnswer={props.choosenAnswer}
                        changeWord={props.testRepeat} rightAnswer={props.rightAnswer} translate="translation" test="yes"/>
        </div>
    )
}

export default TestRepeatTest;