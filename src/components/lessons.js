import React from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';

const speak = (text, lang) => {
    console.log('speak');
    //speech functionality (utterance - przemowienie)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

const Lessons = () => {
    const backgroundColor = "white";
    return (
        <div className="mainContent lessons" style={{backgroundColor: `${backgroundColor}`}}>
            <h2 className="mainContent__ovlpTitle">Lesson</h2>
            <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                <h3 className="mainContent__englishWord">productivity</h3>
                <div className="mainContent__polishWord">produktywność</div>
                <div className="mainContent__spelling">/spelling/</div>
                <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"
                    onClick={() => speak("productivity", "en-GB")}/>
            </div>
        </div>
    )
}

export default Lessons;