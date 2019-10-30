import React from 'react';

const LessonNavigation = (props) => {
    return (
        <div className="navigation">
            <div className="navigation--left" onClick={() => props.changeWord("prev")} 
                style={{visibility: props.words.currentWord <= props.displayFrom ? "hidden" : "visible", display: props.displayLeftArrow === "yes" ? "block" : "none"}}>
                Prev
            </div>
            <div className="button button--goToTest" style={{display: props.words.currentWord >= props.displayTo ? "block" : "none"}}
                onClick={() => {
                    props.setContent.changeContent(props.goToOverlap);
                    props.visibility.changeVisibility("activeOverlap", props.goToOverlap);
                }}>
                {props.buttonText}
            </div>
            <div className="navigation--right" onClick={() => {
                    props.changeWord("next");
                    props.changeWord("choosenAnswer", "none");
                }}
                style={{visibility: props.words.currentWord >= props.displayTo ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default LessonNavigation;