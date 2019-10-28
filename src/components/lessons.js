import React, { useContext, useState } from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';
import { DictionaryContext } from '../contexts/DictionaryContext.js';

const speak = (text, lang, speed) => {
    // if speaking is in progress don't invoke utterance again
    if (speechSynthesis.speaking) {
        return;
    }
    let rate = 1;
    if (speed === "slow") {
        rate = 0.7;
    }
    //speech functionality (utterance - przemowienie)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
}

const Lessons = () => {
    const backgroundColor = "white";
    const getDictionary = useContext(DictionaryContext);
    console.log(getDictionary.dictionary[0]);
    const [words, setWords] = useState({
        currentWord: 1,
    });
    const changeWord = (action) => {
        if (action === "prev") {
            setWords({currentWord: words.currentWord - 1 })
        }
        if (action === "next") {
            setWords({currentWord: words.currentWord + 1 })
        }
    }
    console.log("words ", words)
    return (
        <div className="mainContent lessons" style={{backgroundColor: `${backgroundColor}`}}>
            <h2 className="mainContent__ovlpTitle">Lesson</h2>
            <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                <h3 className="mainContent__englishWord">{getDictionary.dictionary[words.currentWord].word}</h3>
                <div className="mainContent__polishWord">{getDictionary.dictionary[words.currentWord].translation}</div>
                <div className="mainContent__spelling">{getDictionary.dictionary[words.currentWord].spelling}</div>
                <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                    onClick={() => speak(getDictionary.dictionary[words.currentWord].word, "en-GB", "fast")}/>
            </div>
            <div className="navigation">
                <div className="navigation--left" onClick={() => changeWord("prev")} style={{visibility: words.currentWord === 0 ? "hidden" : "visible"}}>Prev</div>
                <div className="navigation--right" onClick={() => changeWord("next")} style={{visibility: words.currentWord === 2 ? "hidden" : "visible"}}>Next</div>
            </div>
        </div>
    )
}

export default Lessons;