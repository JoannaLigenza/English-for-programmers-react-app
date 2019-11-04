import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { DictionaryContext } from '../contexts/DictionaryContext.js';


const AdvancedOptions = (props) => {
    const visibility = useContext(VisibilityContext);
    const areAdvanceOptionsVisible = visibility.isVisible.areAdvanceOptionsVisible
    const getDictionary = useContext(DictionaryContext);
    const dictionary = getDictionary.dictionaryData.dictionary;
    const wordIndex = props.wordIndex;

    const examples = dictionary[wordIndex].examples.map( (example, index) => {
        //return {example[0]} ({example[1]})
        return <li key={index}> {example[0].charAt(0).toUpperCase() + example[0].slice(1)} ({example[1].charAt(0).toUpperCase() + example[1].slice(1)}) </li>
    });

    const partsOfSpeech = dictionary[wordIndex].partOfspeech.map ((part, index) => {
        return <p key={index}>{part[0]}: {part[1]}</p>
    } );

    return (
        <div className="advancedOptions" style={{display: areAdvanceOptionsVisible ? "block" : "none" }}>
            <h2> {dictionary[wordIndex].word} </h2>
            <div className="advancedOptions__desc">Meaning (znaczenie):</div>
            <h3 className="advancedOptions__option"> {dictionary[wordIndex].meaning} </h3>
            <div className="advancedOptions__desc">Examples (przykłady):</div>
            <h3 className="advancedOptions__option advancedOptions__option--list"> <ul>{examples}</ul> </h3>
            <div className="advancedOptions__desc">Parts of speech (części mowy):</div>
            <h3 className="advancedOptions__option advancedOptions__option--list"> {partsOfSpeech} </h3>
        </div>
    )
}

export default AdvancedOptions;