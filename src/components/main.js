import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import Lessons from './lessons.js';
import Reading from './reading.js';
import Writing from './writing.js';
import Listening from './listening.js';
import Test from './test.js';
import Dictionary from './dictionary.js';
import TestWords from './testComponents/testWords.js';
import TestRepeat from './testComponents/testRepeat.js';
import TestFavourites from './testComponents/testFavourites.js';
import Score from'./testComponents/score.js';

const Main = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const whichContentLoad = setContent.content.content;
    const getDictionary = useContext(DictionaryContext);
    const getSettings = useContext(SettingsContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    // display words depends on lesson number
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }

    // setting main content depends on setContent value (<DisplayContent />)
    const content = {
        lessons: Lessons,
        reading: Reading, 
        writing: Writing,
        listening: Listening,
        test: Test,
        dictionary: Dictionary,
        testOne: TestWords,
        testTwo: TestRepeat,
        testThree: TestFavourites,
        score: Score
    }
    let DisplayContent = content.lessons;

    if (whichContentLoad === "Lessons") {
        DisplayContent = content.lessons;
    } else if (whichContentLoad === "Reading") {
        DisplayContent = content.reading;
    } else if (whichContentLoad === "Writing") {
        DisplayContent = content.writing;
    } else if (whichContentLoad === "Listening") {
        DisplayContent = content.listening;
    } else if (whichContentLoad === "Test") {
        DisplayContent = content.test;
    } else if (whichContentLoad === "Dictionary") {
        DisplayContent = content.dictionary;
    } else if (whichContentLoad === "TestOne") {
        DisplayContent = content.testOne;
    } else if (whichContentLoad === "TestTwo") {
        DisplayContent = content.testTwo;
    } else if (whichContentLoad === "TestThree") {
        DisplayContent = content.testThree;
    } else if (whichContentLoad === "Score") {
        DisplayContent = content.score;
    }

    return (
        <div className={visibility.isVisible.isMainVisible ? "main visible" : "main hidden"} >
            <div className="mainContainer">
                <div className="button--close" onClick={() => {
                    visibility.changeVisibility("main");
                    setContent.changeContent("none"); }
                }>X</div>
                <DisplayContent visibility={visibility} setContent={setContent} displayFrom={displayFrom} displayTo={displayTo}
                        lessonNumber={lessonNumber} dictionary={dictionary} wordsInLesson={wordsInLesson} getSettings={getSettings} />
            </div>
        </div>
    )
}

export default Main;