import React, { useContext, useState } from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import AdvancedOptions from './advancedOptions.js';

// set speaking
const speak = (text, lang, speed) => {
    // if speaking is in progress don't invoke utterance again
    if (speechSynthesis.speaking) {
        return;
    }
    let rate = 1;
    if (speed === "slow") {
        if (lang === "en-GB") {
            rate = 0.7;
        }
        if (lang === "en-US") {
            rate = 0.4;
        }
    }
    //speech functionality (utterance - przemowienie)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
}

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
    console.log("speakRate ", speakRate)
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
                <div className="navigation">
                    <div className="navigation--left" onClick={() => changeWord("prev")} style={{visibility: words.currentWord <= displayFrom ? "hidden" : "visible"}}>Prev</div>
                    <div className="button button--goToTest" style={{display: words.currentWord >= displayTo ? "block" : "none"}}
                        onClick={() => {
                            setContent.changeContent("Test");
                            visibility.changeVisibility("activeOverlap", "Test");
                        }}>
                        Solve test
                    </div>
                    <div className="navigation--right" onClick={() => changeWord("next")} style={{visibility: words.currentWord >= displayTo ? "hidden" : "visible"}}>Next</div>
                </div>
            </div>
            <AdvancedOptions wordIndex={words.currentWord}/>
        </div>
    )
}

export default Lessons;