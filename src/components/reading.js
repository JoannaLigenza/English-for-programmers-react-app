import React, { useState, useContext, useEffect } from 'react';
import { DictionaryContext } from '../contexts/DictionaryContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import LessonNavigation from './lessonNavigation.js';
import playSound from '../sounds/sounds.js';

const Reading = () => {
    const lessonNumber = JSON.parse(localStorage.getItem("lessonNumber"));
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const getSettings = useContext(SettingsContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const actualAnswers = setContent.content.actualAnswers;
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
        answer: "",
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
    
    // choosing random answers + right answer
    const chooseAnswers = () => {
        const firstWord = words.currentWord;
        let answersSet = new Set();
        const randomI = Math.floor(Math.random()*6);
        for (let i=0; i < 100; i++) {
            if (answersSet.size === 6) {
                break;
            }
            if (i === randomI) {
                answersSet.add(dictionary[firstWord].translation);
            } else {
                const random = Math.floor(Math.random()*(dictionary.length-10));
                answersSet.add(dictionary[random].translation);
            }
        }
        const answers = [...answersSet];
        return answers;
    }

    // 1. reading random answers from just generated answers or mainContentContext  2. saving random answers in mainContentContext
    useEffect(() => {
        let answers;
        if (words.choosenAnswer === "none") {
            answers = chooseAnswers();
        } else {
            answers = actualAnswers;
        }
        setContent.changeContent("actualAnswers", answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [words.choosenAnswer]);


    // getting each answer from actualAnswers and returning it all with specific options
    const getAnswers = () => {
        let answers = actualAnswers;
        if (answers === "") {
            answers = [];
        }
        answers = answers.map( (answer, index) => {
            return <div key={index} onClick={() => {
                                changeWord("choosenAnswer", answer); 
                                // if choosen answer is equal current word translation, then play right sound, else play wrong sound
                                if (dictionary[words.currentWord].translation === answer) {
                                    playSound("rightSound");
                                } else {
                                    playSound("wrongSound");
                                }
                            }}
                        className={ words.choosenAnswer === answer ? "oneAnswer-button oneAnswer-button--pressed" : "oneAnswer-button"}>
                    <p className={ words.choosenAnswer === answer ? words.rightAnswer : "grayColor" } >
                        {answer}
                    </p>
                </div>
        });
        return answers;
    }
    const answers = getAnswers();

    return (
        <div className="readingSection">
            <h2 className="readingSection__word">{dictionary[words.currentWord].word}</h2>
            <div className="readingSection__answers">
                {answers}
            </div>
            <LessonNavigation words={words} changeWord={changeWord} displayFrom={displayFrom} displayTo={displayTo} 
                setContent={setContent} visibility={visibility} goToOverlap="Listening" buttonText="Practice listening"
                displayLeftArrow="no" getSettings={getSettings} rightAnswer={words.rightAnswer} displayLoudSpeaker="no"/>
        </div>
    )
}

export default Reading;