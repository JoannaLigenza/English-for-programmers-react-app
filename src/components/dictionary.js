import React, { useContext, useState } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import checkboxGreen from '../img/checkbox-green.svg';
import checkboxYellow from '../img/checkbox-yellow.svg';
import checkboxRed from '../img/checkbox-red.svg';
import checkboxGray from '../img/checkbox-gray.svg';
import star from '../img/star.svg';
import starEmpty from '../img/star-empty.svg';
import speaker from '../img/speaker.svg';
import speak from '../sounds/speaker.js';

const Dictionary = (props) => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;

    const [state, setState] = useState({
        whichWordOptionsAreVisible: ""
    });

    const changeWordOptionVisibility = (id) => {
        if (id === state.whichWordOptionsAreVisible) {
            setState({whichWordOptionsAreVisible: ""});
        } else {
            setState({whichWordOptionsAreVisible: id});
        }
    }

    const checkBoxImg = (passed) => {
        let img = checkboxGray;
        if (passed === "yes") {
            img = checkboxGreen;
        }
        if (passed === "no") {
            img = checkboxRed;
        }
        if (passed === "repetition") {
            img = checkboxYellow;
        }
        return img;
    }

    const starImg = (isInFavourites) => {
        let img = starEmpty;
        if (isInFavourites === 'yes') {
            img = star;
        }
        return img;
    }

    const displayDictionary = dictionary.map(word => {
        return (
            <li key={word.id} className="dictionary-list-element">
                {/* visible part of list element */}
                <div className="dictionary-list-element__top">
                    <div className="dictionary-list-element__add-to-favourites">
                        <img src={starImg(word.favourites)} alt="star-favourites icon" 
                        onClick={() => getDictionary.changeDictionaryData("favourites", word)}/>
                    </div>
                    <div className="dictionary-list-element__word" onClick={() => changeWordOptionVisibility(word.id)}>
                        <div className="dictionary-list-element__word--word">{word.word}</div>
                        <div>{word.translation}</div>
                    </div>
                    <div className="dictionary-list-element__speak-passed">
                        <div className="">
                            <img src={speaker} alt="speaker icon - press and listen" className="speaker-icon"
                            onClick={() => speak(word.word, language, speakRate)}/>
                        </div>
                        <div className="checkBox">
                            <img src={checkBoxImg(word.passed)} alt="checkbox" />
                        </div>
                    </div>
                </div>

                {/* hidden part of list element */}
                <div className={state.whichWordOptionsAreVisible === word.id ? "dictionary-list-element__bottom" : "dictionary-list-element__bottom dictionary-hidden"}>
                    hidden
                </div>
            </li>
        )
    })

    return (
        <div className="dictionarySection">
            {displayDictionary}
        </div>
    )
}

export default Dictionary;