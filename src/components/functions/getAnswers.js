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
                                props.changeWord("choosenAnswer", answer, props.translate); 
                                // if choosen answer is equal current word translation, then play right sound, else play wrong sound
                                if (dictionary[props.currentWord][props.translate] === answer) {
                                    playSound("rightSound");
                                } else {
                                    playSound("wrongSound");
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