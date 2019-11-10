import React, { useContext, useState } from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';
import { SettingsContext } from '../contexts/SettingsContext.js';
import AdvancedOptions from './advancedOptions.js';
import LessonNavigation from './lessonNavigation.js';
import speak from '../sounds/speaker.js';

const Lessons = (props) => {
    const lessonNumber = props.lessonNumber;
    const getSettings = useContext(SettingsContext);
    const dictionary = props.dictionary;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;

    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*props.wordsInLesson,
    });
    const changeWord = (action) => {
        if (action === "prev") {
            setWords({...words, currentWord: words.currentWord - 1 })
        }
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1 })
        }
    }

    if (words.currentWord > (dictionary.length-1)) {
        return (
            <div className="all-tests-passed">
                Congratulations, you have passed all tests! :)
            </div>
        )
    }

    return (
        <div className="mainContent">
            <div className="mainContent__lessons">
                <h2 className="mainContent__ovlpTitle">Lesson {lessonNumber}</h2>
                <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                    <h3 className="mainContent__englishWord">{dictionary[words.currentWord].word}</h3>
                    <div className="mainContent__polishWord">{dictionary[words.currentWord].translation}</div>
                    <div className="mainContent__spelling">{dictionary[words.currentWord].spelling}</div>
                    <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                        onClick={() => speak(dictionary[words.currentWord].word, language, speakRate)}/>
                </div>
                <LessonNavigation words={words} changeWord={changeWord} displayFrom={props.displayFrom} displayTo={props.displayTo} 
                    setContent={props.setContent} visibility={props.visibility} goToOverlap="Reading" buttonText="Practice reading" 
                    displayLeftArrow="yes" displayLoudSpeaker="no" />
            </div>
            <AdvancedOptions wordIndex={words.currentWord}/>
        </div>
    )
}

export default Lessons;