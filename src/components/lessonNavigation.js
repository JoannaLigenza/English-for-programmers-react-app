import React from 'react';
import playSound from '../sounds/sounds.js';

const LessonNavigation = (props) => {
    console.log(props.rightAnswer)
    return (
        <div className="navigation">
            <div className="navigation--left" onClick={() => props.changeWord("prev")} 
                style={{visibility: props.words.currentWord <= props.displayFrom ? "hidden" : "visible", display: props.displayLeftArrow === "yes" ? "block" : "none"}}>
                Prev
            </div>
            <div className="button button--goToTest" style={{display: props.words.currentWord >= props.displayTo ? "block" : "none"}}
                onClick={() => {
                    if (props.rightAnswer !== undefined) {
                        if (props.rightAnswer === "greenColor") {
                            props.setContent.changeContent("setContentInOverlap", props.goToOverlap);
                            props.visibility.changeVisibility("activeOverlap", props.goToOverlap);
                        } else {
                            playSound("wrongSound");
                        }
                    } else {
                        props.setContent.changeContent("setContentInOverlap", props.goToOverlap);
                        props.visibility.changeVisibility("activeOverlap", props.goToOverlap);
                    }
                }}>
                {props.buttonText}
            </div>
            <div className="navigation--right" onClick={() => {
                    // if props.rightAnswer or props.getSettings === undefined then this component is used by lessonComponent, else it is used by reading, listening, writing or test component
                    if (props.rightAnswer !== undefined) {
                        if (props.rightAnswer === "greenColor") {
                            props.changeWord("next");
                        } else {
                            playSound("wrongSound");
                        }
                    } else {
                        props.changeWord("next");
                    }

                    if (props.getSettings !== undefined) {
                        props.getSettings.setSettings("actualAnswers", "");
                    }
                }}
                style={{visibility: props.words.currentWord >= props.displayTo ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default LessonNavigation;