import React, { useState, useContext, useEffect } from 'react';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import { chooseAnswers } from './functions/chooseAnswers.js';
import GetAnswers from './functions/getAnswers.js';
import LessonNavigation from './lessonNavigation.js';
import speak from '../sounds/speaker.js';

const Listening = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const actualAnswers = setContent.content.actualAnswers;
    const language = getSettings.settings.language;
    const speakRate = getSettings.settings.speakRate;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    // display words depends on lesson number
    const wordsInLesson = getSettings.settings.wordsInLesson;
    const displayFrom = (lessonNumber-1)*wordsInLesson;
    let displayTo = (displayFrom + wordsInLesson)-1;
    if ( displayTo > (dictionary.length)-1 ) {
        displayTo = dictionary.length-1;
    }

    // state
    const [words, setWords] = useState({
        currentWord: (lessonNumber-1)*wordsInLesson,
        answer: "plik",
        choosenAnswer: "none",
        rightAnswer: "grayColor",
        actualAnswers: actualAnswers
    });

    // state modification
    const changeWord = (action, set) => {
        if (action === "next") {
            setWords({...words, currentWord: words.currentWord + 1, choosenAnswer: "none", rightAnswer: "grayColor" });
        }
        if (action === "choosenAnswer") {
            let rightAnswer = "redColor";
            if (set === dictionary[words.currentWord].translation) {
                rightAnswer = "greenColor";
            }
            setWords({...words, choosenAnswer: set, rightAnswer: rightAnswer });
        }
        if (action === "actualAnswers") {
            setWords({...words, actualAnswers: set });
        }
    }

    // 1. reading random answers from just generated answers or mainContentContext  2. saving random answers in mainContentContext
    useEffect(() => {
        let answers;
        if (words.choosenAnswer === "none") {
            // choose 6 random answers
            answers = chooseAnswers(words.currentWord, dictionary, numberOfAnswers, "translation");
            speak(dictionary[words.currentWord].word, language, speakRate);
        } else {
            // get actual choosen answer from mainContext
            answers = actualAnswers;
        }
        // saving answers in mainContentContext
        setContent.changeContent("actualAnswers", answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.choosenAnswer]);

    return (
        <div className="readingSection">
            <h2 className="readingSection__word">{dictionary[words.currentWord].spelling}</h2>
            <GetAnswers currentWord={words.currentWord} choosenAnswer={words.choosenAnswer} actualAnswers={words.actualAnswers} 
                        changeWord={changeWord} rightAnswer={words.rightAnswer} translate="translation" />
            <LessonNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                setContent={setContent} visibility={visibility} goToOverlap="Writing" buttonText="Practice writing"
                displayLeftArrow="no" getSettings={getSettings} rightAnswer={words.rightAnswer} displayLoudSpeaker="yes"
                speakWord={dictionary[words.currentWord].word} />
        </div>
    )
}

export default Listening;