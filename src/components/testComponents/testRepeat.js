import React, {useState, useContext } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import TestRepeatLesson from './testRepeatLesson.js';
import TestRepeatTest from './testRepeatTest.js';

const TestRepeat = () => {
    //const setContent = useContext(MainContentContext);

    //state
    const [repetition, setRepetition] = useState({
        content: TestRepeatLesson,
        currentWord: 0,
    });
    
    const testRepeat = (option, set) => {
        if (option === "setContent") {
            setRepetition({...repetition, content: set})
        }
        if (option === "setCurrentWord") {
            setRepetition({...repetition, currentWord: repetition.currentWord + set})
        }
    }
    
    const RepetitionContent = repetition.content;
    console.log(repetition.currentWord)
    return (
        <div className="testSection" >
            <h3>Repetition</h3>
            <div className="repetiton-option">
                <button className="repetition__button--lesson" onClick={() => testRepeat("setContent", TestRepeatLesson)}>Lesson</button>
                <button className="repetition__button--test" onClick={() => testRepeat("setContent", TestRepeatTest)}>Test</button>
            </div> 
            <div className="repetition-content">
                <RepetitionContent currentWord={repetition.currentWord} testRepeat={testRepeat} TestRepeatTest={TestRepeatTest} />
            </div>
        </div>
    )
}

export default TestRepeat;