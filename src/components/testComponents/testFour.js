import React, { useContext } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { SettingsContext } from '../../contexts/SettingsContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import GetAnswers from '../functions/getAnswers.js';

const TestFour = (props) => {
    const setContent = useContext(MainContentContext);
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }

    console.log("test 4")
    return (
        <div className="testSection" >
           Test four
        </div>
    )
}

export default TestFour;