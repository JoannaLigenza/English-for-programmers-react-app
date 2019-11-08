import React, { useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import AdvancedOptions from '../advancedOptions.js';
import LessonNavigation from '../lessonNavigation.js';
import speak from '../../sounds/speaker.js';
import speaker from '../../img/speaker.svg';
import noteyellow from '../../img/noteyellow.svg';

const TestRepeatLesson = (props) => {
    //const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;
    const currentWord = props.currentWord;
    const words = JSON.parse(localStorage.getItem("repetitionWords"));

    if (words.length === 0)  {
        return (
            <div className="mainContent" >
                You have no words to repeat :)
            </div>
        )
    }

    return (
        <div className="mainContent" >
            {/* // Lesson repetiton */}
            <div className="mainContent__lessons">
                <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                    <h3 className="mainContent__englishWord">{words[currentWord][0].word}</h3>
                    <div className="mainContent__polishWord">{words[currentWord][0].translation}</div>
                    <div className="mainContent__spelling">{words[currentWord][0].spelling}</div>
                    <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                        onClick={() => speak(words[currentWord][0].word, language, speakRate)}/>
                </div>

                {/* // nawigation */}
                <div className="navigation">
                    {/* Arrow Left */}
                    <div className="navigation--left" onClick={() => props.testRepeat("setCurrentWord", -1)} 
                        style={{visibility: props.currentWord === 0 ? "hidden" : "visible" }}>
                        Prev
                    </div>
                    {/* Go to Test Button */}
                    <div className="button button--goToTest" style={{display: props.currentWord === words.length-1 ? "block" : "none"}}
                        onClick={() => props.testRepeat("setContent", props.TestRepeatTest) }>
                        Go To Repetiton Test
                    </div>
                    {/* Arrow Right */}
                    <div className="navigation--right" onClick={() => props.testRepeat("setCurrentWord", 1) }
                        style={{visibility: props.currentWord === words.length-1 ? "hidden" : "visible"}}>
                        Next
                    </div>
                </div>

            </div>
            <AdvancedOptions wordIndex={currentWord}/>
        </div>
    )
}

export default TestRepeatLesson;