import React, { useContext } from 'react';
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

    const addToFavourites = (word) => {
        getDictionary.changeDictionaryData("favourites", word);
    }

    const displayDictionary = dictionary.map(word => {
        return (
            <li key={word.id} className="dictionary-list-element">
                <div className="dictionary-list-element__add-to-favourites">
                    <img src={starImg(word.favourites)} alt="star-favourites icon" onClick={() => addToFavourites(word)}/>
                </div>
                <div className="dictionary-list-element__word">
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