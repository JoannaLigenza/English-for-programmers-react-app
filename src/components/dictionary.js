import React, { useContext, useState } from 'react';
// import { VisibilityContext } from '../contexts/VisibilityContext.js';
// import { MainContentContext } from '../contexts/MainContentContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import checkboxGreen from '../img/checkbox-green.svg';
import checkboxYellow from '../img/checkbox-yellow.svg';
import checkboxRed from '../img/checkbox-red.svg';
import checkboxGray from '../img/checkbox-gray.svg';
import star from '../img/star.svg';
import starEmpty from '../img/star-empty.svg';
import arrowDown from '../img/arrow-down.svg';
import speaker from '../img/speaker.svg';
import speak from '../sounds/speaker.js';

const Dictionary = (props) => {
    // const visibility = useContext(VisibilityContext);
    // const setContent = useContext(MainContentContext);
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

    let color = "gray";

    const checkBoxImg = (passed) => {
        let img = checkboxGray;
        if (passed === "yes") {
            img = checkboxGreen;
            color = "green";
        }
        if (passed === "no") {
            img = checkboxRed;
            color = "red";
        }
        if (passed === "repetition") {
            img = checkboxYellow;
            color = "#FFE100";  // yellow
        }
        if (passed === "") {
            color = "gray"; 
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

    const passed = (passed) => {
        let text = "not tested yet";
        if (passed === "yes") {
            text = passed;
        } 
        if (passed === "no") {
            text = passed;
        }
        if (passed === "repetition") {
            text = "yes, in repetition";
        }
        return text;
    }

    const displayDictionary = dictionary.map(word => {
        const examples = word.examples.map((example, index) => {
             return <li key={`example${index}`}> {example[0].charAt(0).toUpperCase() + example[0].slice(1)} ({example[1].charAt(0).toUpperCase() + example[1].slice(1)}) </li>
        })
        const partsOfSpeech = word.partOfspeech.map((part, index) => {
            return <p key={`part${index}`}>{part[0]}: {part[1]}</p>
        })
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
                        <img src={arrowDown} alt="arrow-down icon" className="arrow-down-icon"/>
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
                    <div className="dictionary-list-element__desc">Spelling (wymowa):</div>
                    <h3 className="dictionary-list-element__option"> {word.spelling} </h3>
                    <div className="dictionary-list-element__desc">Meaning (znaczenie):</div>
                    <h3 className="dictionary-list-element__option"> {word.meaning} </h3>
                    <div className="dictionary-list-element__desc">Examples (przykłady):</div>
                    <h3 className="dictionary-list-element__option"> <ul>{examples}</ul> </h3>
                    <div className="dictionary-list-element__desc">Parts of speech (części mowy):</div>
                    <h3 className="dictionary-list-element__option"> {partsOfSpeech} </h3>
                    <div className="dictionary-list-element__desc">Passed (zaliczone):</div>
                    <h3 className="dictionary-list-element__option" style={{color: color}}> {passed(word.passed)} </h3>
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