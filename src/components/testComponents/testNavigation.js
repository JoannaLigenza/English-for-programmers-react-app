import React, { useContext } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';

const TestNavigation = (props) => {
    const setContent = useContext(MainContentContext);
    const testEachWordXTimes = setContent.content.testEachWordXTimes;
    const testLoop = setContent.content.testLoop;
    return (
        <div className="navigation">
            <div className="button button--goToTest" 
                style={{display: (props.currentWord >= props.displayTo && testLoop >= testEachWordXTimes) ? "block" : "none"}}
                onClick={() => {
                    
                }}>
                Zobacz wynik
            </div>
            <div className="navigation--right" onClick={() => {
                    if (props.changetestTwo !== undefined) {
                        props.changetestTwo("next");
                    }
                    if (props.currentWord === (props.displayTo )) {
                        props.changeWord("currentWord");
                        setContent.changeContent("testLoop");
                    } else {
                        props.changeWord("next");
                    }
                    //console.log(props.currentWord, props.displayTo, testLoop, testEachWordXTimes);
                }}
                style={{visibility: (props.currentWord >= props.displayTo && testLoop >= testEachWordXTimes) ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default TestNavigation;