import React, { useContext} from 'react';
import { DictionaryContext } from '../../contexts/DictionaryContext.js';
import { MainContentContext } from '../../contexts/MainContentContext.js';
import playSound from '../../sounds/sounds.js';

const GetAnswers = (props) => {
    const setContent = useContext(MainContentContext);
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const actualAnswers = setContent.content.actualAnswers;

    // getting each answer from actualAnswers and returning it all with specific options
    const getAnswers = () => {
        let answers = actualAnswers;
        if (answers === "") {
            answers = [];
        }
        answers = answers.map( (answer, index) => {
            return <div key={index} onClick={() => {
                                // if this component is used in test, then block other answers after choosing one answer. Answer can be choosed only once
                                // else answer can be choosed many times
                                if (props.test !== undefined && props.test === "yes") {
                                    if (props.choosenAnswer === "none") {
                                        // set answer
                                        props.changeWord("choosenAnswer", answer, props.translate); 
                                        // if choosen answer is equal current word translation, then add one point and play right sound, else play wrong sound
                                        if (dictionary[props.currentWord][props.translate] === answer) {
                                            playSound("rightSound");
                                            // if tested word is not passed then add point
                                            if (dictionary[props.currentWord].passed === "") {
                                                getDictionary.changeDictionaryData("points", "yes", dictionary[props.currentWord].id);
                                            }
                                        } else {
                                            playSound("wrongSound");
                                            getDictionary.changeDictionaryData("points", "no", dictionary[props.currentWord].id);
                                        }
                                    }
                                } else {
                                    // set answer
                                    props.changeWord("choosenAnswer", answer, props.translate); 
                                    // if choosen answer is equal current word translation, then play right sound, else play wrong sound
                                    if (dictionary[props.currentWord][props.translate] === answer) {
                                        playSound("rightSound");
                                    } else {
                                        playSound("wrongSound");
                                    }
                                }
                            }}
                        className={ props.choosenAnswer === answer ? "oneAnswer-button oneAnswer-button--pressed" : "oneAnswer-button"}>
                    <p className={ props.choosenAnswer === answer ? props.rightAnswer : "grayColor" } >
                        {answer}
                    </p>
                </div>
        });
        return answers;
    }
    const answers = getAnswers();
    
    return (
        <div className="readingSection__answers">
            {answers}
        </div>
    )
}

export default GetAnswers;