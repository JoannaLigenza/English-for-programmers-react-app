import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import GetAnswers from '../functions/getAnswers.js';
import TestNavigation from './testNavigation.js';
import speak from '../../sounds/speaker.js';
import speaker from '../../img/speaker.svg';


const TestThree = (props) => {
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;

    useEffect(() => {
        let answers;
        if (props.choosenAnswer === "none") {
            // choose 6 random answers
            answers = chooseAnswers(props.currentWord, dictionary, numberOfAnswers, "translation");
            speak(dictionary[props.currentWord].word, language, speakRate);
        } else {
            // get actual choosen answer from mainContext
            answers = actualAnswers;
        }
        // saving answers in mainContentContext
        setContent.changeContent("actualAnswers", answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.choosenAnswer]);

    console.log("test 3")
    return (
        <div className="testSection" >
            <h2 className="readingSection__word" style={{ marginBottom: 0}}>{dictionary[props.currentWord].spelling}</h2>
            <img src={speaker} alt="speaker icon - press and listen" className="speaker-icon" style={{position: "relative", top: -45, left: -150}}
                        onClick={() => speak(dictionary[props.currentWord].word, language, speakRate)}/>
            <GetAnswers currentWord={props.currentWord} choosenAnswer={props.choosenAnswer} actualAnswers={props.actualAnswers} 
                        changeWord={props.changeWord} rightAnswer={props.rightAnswer} translate="translation" test="yes" />
            <TestNavigation currentWord={props.currentWord} changeWord={props.changeWord} displayTo={props.displayTo} />
        </div>
    )
}

export default TestThree;