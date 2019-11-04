import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import GetAnswers from '../functions/getAnswers.js';

const TestOne = (props) => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }

    useEffect(() => {
        let answers;
        if (props.choosenAnswer === "none") {
            // choose 6 random answers
            answers = chooseAnswers(props.currentWord, dictionary, numberOfAnswers, "translation");
        } else {
            // get actual choosen answer from mainContext
            answers = actualAnswers;
        }
        // saving answers in mainContentContext
        setContent.changeContent("actualAnswers", answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.choosenAnswer]);

    console.log("test one");
    return (
        <div className="testSection" >
            <h2 className="readingSection__word">{dictionary[props.currentWord].word}</h2>
            <GetAnswers currentWord={props.currentWord} choosenAnswer={props.choosenAnswer} actualAnswers={props.actualAnswers} 
                        changeWord={props.changeWord} rightAnswer={props.rightAnswer} translate="translation" />
        </div>
    )
}

export default TestOne;