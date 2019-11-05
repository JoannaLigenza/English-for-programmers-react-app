import React, { useContext, useEffect } from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import { chooseAnswers } from '../functions/chooseAnswers.js';
import GetAnswers from '../functions/getAnswers.js';
import TestNavigation from './testNavigation.js';

const TestFour = (props) => {
    const setContent = useContext(MainContentContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const numberOfAnswers = setContent.content.numberOfAnswers;
    const actualAnswers = setContent.content.actualAnswers;
    const sentence = dictionary[props.currentWord].examples[1][0];

    let displaySentence = sentence.split(" ").map(word => {
        //console.log("bzbz ",word, dictionary[props.currentWord].word)
        if (word === dictionary[props.currentWord].word) {
            word = "______";
        }
        return word;
    });
    //console.log(displaySentence)
    displaySentence = displaySentence.join(" ");

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

    console.log("test four");
    return (
        <div className="testSection" >
            <h2 className="readingSection__word">{displaySentence}</h2>
            <GetAnswers currentWord={props.currentWord} choosenAnswer={props.choosenAnswer} actualAnswers={props.actualAnswers} 
                        changeWord={props.changeWord} rightAnswer={props.rightAnswer} translate="word" test="yes"/>
            <TestNavigation currentWord={props.currentWord} changeWord={props.changeWord}
                displayTo={props.displayTo} />
        </div>
    )
}

export default TestFour;