import React, { useContext, useState } from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import AdvancedOptions from './advancedOptions.js';
import LessonNavigation from './lessonNavigation.js';
import speak from '../sounds/speaker.js';

const Lessons = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const backgroundColor = "white";
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getDictionary = useContext(DictionaryContext);
    const getSettings = useContext(SettingsContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }
    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*wordsInLesson,
    });
    const changeWord = (action) => {
        if (action === "prev") {
            setWords({...words, currentWord: words.currentWord - 1 })
        }
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1 })
        }
    }

    return (
        <div className="mainContent" style={{backgroundColor: `${backgroundColor}`}}>
            <div className="mainContent__lessons">
                <h2 className="mainContent__ovlpTitle">Lesson {lessonNumber}</h2>
                <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                    <h3 className="mainContent__englishWord">{dictionary[words.currentWord].word}</h3>
                    <div className="mainContent__polishWord">{dictionary[words.currentWord].translation}</div>
                    <div className="mainContent__spelling">{dictionary[words.currentWord].spelling}</div>
                    <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                        onClick={() => speak(dictionary[words.currentWord].word, language, speakRate)}/>
                </div>
                <LessonNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                    setContent={setContent} visibility={visibility} goToOverlap="Reading" buttonText="Go practice" displayLeftArrow="yes"
                    displayLoudSpeaker="no" />
            </div>
            <AdvancedOptions wordIndex={words.currentWord}/>
        </div>
    )
}

export default Lessons;