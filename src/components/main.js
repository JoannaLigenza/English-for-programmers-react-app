import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import Lessons from './lessons.js';
import Reading from './reading.js';
import Writing from './writing.js';
import Listening from './listening.js';
import Test from './test.js';
import TestOne from './testOne.js';
import TestTwo from './testTwo.js';
import TestThree from './testThree.js';

const Main = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const whichContentLoad = setContent.content.content;

    // setting main content depends on setContent value (<DisplayContent />)
    const content = {
        lessons: Lessons,
        reading: Reading, 
        writing: Writing,
        listening: Listening,
        test: Test,
        testOne: TestOne,
        testTwo: TestTwo,
        testThree: TestThree
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
    } else if (whichContentLoad === "TestOne") {
        DisplayContent = content.testOne;
    } else if (whichContentLoad === "TestTwo") {
        DisplayContent = content.testTwo;
    } else if (whichContentLoad === "TestThree") {
        DisplayContent = content.testThree;
    }

    return (
        <div className={visibility.isVisible.isMainVisible ? "main visible" : "main hidden"} >
            <div className="mainContainer">
                <div className="button--close" onClick={() => {
                    visibility.changeVisibility("main");
                    setContent.changeContent("none"); }
                }>X</div>
                <DisplayContent />
            </div>
        </div>
    )
}

export default Main;