import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import GetAnswers from '../functions/getAnswers.js';

const TestFive = (props) => {
    const getDictionary = useContext(DictionaryContext);
    const setContent = useContext(MainContentContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;
    // display words depends on lesson number

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

    console.log("test 5 ",)
    return (
        <div className="testSection" >
            <h2 className="readingSection__word">{dictionary[props.currentWord].translation}</h2>
            <GetAnswers currentWord={props.currentWord} choosenAnswer={props.choosenAnswer} actualAnswers={props.actualAnswers} 
                        changeWord={props.changeWord} rightAnswer={props.rightAnswer} translate="word" />
        </div>
    )
}

export default TestFive;