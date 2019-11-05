import React, { useContext } from 'react';
import { MainContentContext } from '../../contexts/MainContentContext.js';

const TestNavigation = (props) => {
    const setContent = useContext(MainContentContext);
    return (
        <div className="navigation">
            <div className="button button--goToTest" style={{display: props.currentWord >= props.displayTo ? "block" : "none"}}
                onClick={() => {
                    
                }}>
                Zobacz wynik
            </div>
            <div className="navigation--right" onClick={() => {
                    if (props.changetestTwo !== undefined) {
                        props.changetestTwo("next");
                    }
                    props.changeWord("next");
                    setContent.changeContent("actualTest", "", "");
                }}
                style={{visibility: props.currentWord >= props.displayTo ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default TestNavigation;