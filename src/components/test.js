import React, { useContext } from 'react';
import { MainContentContext } from '../contexts/MainContentContext.js';

const Test = () => {
    const setContent = useContext(MainContentContext);
    return (
        <div className="testSection" >
            <div className="testSection__section">
                <div className="testSection__content" onClick={() => setContent.changeContent("setContentInOverlap", "TestOne")}>
                    Test your knowledge from lesson 1 <br/>
                    (Testuj wiedzę z lekcji 1)
                </div>
            </div>
            <div className="testSection__section">
                <div className="testSection__content" onClick={() => setContent.changeContent("setContentInOverlap", "TestTwo")}>
                    Repetition <br/>
                    (Powtórzenie)
                </div>
            </div>
            <div className="testSection__section">
                <div className="testSection__content" onClick={() => setContent.changeContent("setContentInOverlap", "TestThree")}>
                    Test words from favourites list <br/>
                    (Testuj słowa z listy ulubionych)
                </div>
            </div>
        </div>
    )
}

export default Test;