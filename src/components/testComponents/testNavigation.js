import React from 'react';

const TestNavigation = (props) => {
    return (
        <div className="navigation">
            <div className="button button--goToTest" style={{display: props.currentWord >= props.displayTo ? "block" : "none"}}
                onClick={() => {
                    
                }}>
                Zobacz wynik
            </div>
            <div className="navigation--right" onClick={() => {
                    props.changeWord("next");
                    if (props.changetestTwo !== undefined) {
                        props.changetestTwo("next");
                    }
                }}
                style={{visibility: props.currentWord >= props.displayTo ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default TestNavigation;