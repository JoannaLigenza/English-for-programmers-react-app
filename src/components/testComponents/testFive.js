import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import GetAnswers from '../functions/getAnswers.js';
import TestNavigation from './testNavigation.js';

const TestFive = (props) => {
    const getDictionary = useContext(DictionaryContext);
    const setContent = useContext(MainContentContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;

    useEffect(() => {
        let answers;
        if (props.choosenAnswer === "none") {
            // choose 6 random answers
            answers = chooseAnswers(props.currentWord, dictionary, numberOfAnswers, "word");
        } else {
            // get actual choosen answer from mainContext
            answers = actualAnswers;
        }
        // saving answers in mainContentContext
        setContent.changeContent("actualAnswers", answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.choosenAnswer]);

    return (
        <div className="testSection" >
            <h2 className="readingSection__word">{dictionary[props.currentWord].translation}</h2>
            <GetAnswers currentWord={props.currentWord} choosenAnswer={props.choosenAnswer}
                        changeWord={props.changeWord} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
            <TestNavigation currentWord={props.currentWord} changeWord={props.changeWord} rightAnswer={props.rightAnswer}
                displayTo={props.displayTo} actualTestNumber={props.actualTestNumber} />
        </div>
    )
}

export default TestFive;