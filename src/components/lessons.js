import React, { useContext } from 'react';
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
    return (
        <div className="mainContent lessons" style={{backgroundColor: `${backgroundColor}`}}>
            <h2 className="mainContent__ovlpTitle">Lesson</h2>
            <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                <h3 className="mainContent__englishWord">{getDictionary.dictionary[0].word}</h3>
                <div className="mainContent__polishWord">{getDictionary.dictionary[0].translation}</div>
                <div className="mainContent__spelling">{getDictionary.dictionary[0].spelling}</div>
                <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                    onClick={() => speak(getDictionary.dictionary[0].word, "en-GB", "fast")}/>
            </div>
            <div className="navigation">
                <div className="navigation--left" onClick={() => console.log('left')}>Prev</div>
                <div className="navigation--right" onClick={() => console.log('right')}>Next</div>
            </div>
        </div>
    )
}

export default Lessons;