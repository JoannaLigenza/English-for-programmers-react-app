import React from 'react';
import speaker from '../img/speaker.svg';
import noteyellow from '../img/noteyellow.svg';

const Lessons = () => {
    const backgroundColor = "white";
    return (
        <div className="mainContent lessons" style={{backgroundColor: `${backgroundColor}`}}>
            <h2 className="mainContent__ovlpTitle">Lesson</h2>
            <div className="mainContent__imageContainer" style={{backgroundImage: `url(${noteyellow})`}}>
                <h3 className="mainContent__englishWord">productivity</h3>
                <div className="mainContent__polishWord">produktywność</div>
                <div className="mainContent__spelling">/spelling/</div>
                <img src={speaker} alt="speaker icon - press and listen" className="mainContent__speaker-icon"/>
            </div>
        </div>
    )
}

export default Lessons;