import React, { useContext } from 'react';
import speaker from '../img/speaker.svg';
import playSound from '../sounds/sounds.js';
import speak from '../sounds/speaker.js';
import { SettingsContext } from '../contexts/SettingsContext.js';

const LessonNavigation = (props) => {
    const getSettings = useContext(SettingsContext);
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;
    return (
        <div className="navigation">
            {/* Arrow Left */}
            <div className="navigation--left" onClick={() => props.changeWord("prev")} 
                // if it is first word in lesson then hide arrow left, else display it
                style={{visibility: props.words.currentWord <= props.displayFrom ? "hidden" : "visible", display: props.displayLeftArrow === "yes" ? "block" : "none"}}>
                Prev
            </div>
            {/* Speaker Icon */}
            <div style={{display: props.displayLoudSpeaker === "yes" ? "block" : "none"}}>
                <img src={speaker} alt="speaker icon - press and listen" className="speaker-icon"
                        onClick={() => props.speakWord !== undefined ? speak(props.speakWord, language, speakRate) : null}
                        style={{position: "absolute"}}/>
            </div>
            {/* Go to Test Button */}
            <div className="button button--goToTest" style={{display: props.words.currentWord >= props.displayTo ? "block" : "none"}}
                onClick={() => {
                    if (props.rightAnswer !== undefined) {
                        // if answer is correct go to next overlap, else play wrong sound
                        if (props.rightAnswer === "greenColor") {
                            props.setContent.changeContent("setContentInOverlap", props.goToOverlap);
                            props.visibility.changeVisibility("activeOverlap", props.goToOverlap);
                        } else {
                            playSound("wrongSound");
                        }
                    } else {
                        // in writing section regardless to answer go to next overlap
                        props.setContent.changeContent("setContentInOverlap", props.goToOverlap);
                        props.visibility.changeVisibility("activeOverlap", props.goToOverlap);
                    }
                }}>
                {props.buttonText}
            </div>
            {/* Arrow Right */}
            <div className="navigation--right" onClick={() => {
                    // if props.rightAnswer or props.getSettings === undefined then this component is used by lessonComponent, else it is used by reading, listening, writing or test component
                    if (props.rightAnswer !== undefined) {
                        // if answer is correct not play antything and go to next word, else play wrong sound
                        if (props.rightAnswer === "greenColor") {
                            props.changeWord("next");
                        } else {
                            playSound("wrongSound");
                        }
                    } else {
                        props.changeWord("next");
                    }
                    // reset actual answers
                    if (props.getSettings !== undefined) {
                        props.getSettings.setSettings("actualAnswers", "");
                    }
                }}
                // if it is the last word in lesson then hide arrow right, else display it
                style={{visibility: props.words.currentWord >= props.displayTo ? "hidden" : "visible"}}>
                Next
            </div>
        </div>
    )
}

export default LessonNavigation;