import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';
import Lessons from './lessons.js';
import Reading from './reading.js';
import Writing from './writing.js';
import Listening from './listening.js';
import Test from './test.js';

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
        test: Test
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
    }

    return (
        <div className={visibility.isVisible.isMainVisible ? "main visible" : "main hidden"} >
            <div className="mainContainer">
                <div className="button button--close" onClick={() => {
                    visibility.changeVisibility("main");
                    setContent.changeContent("none"); }
                }>X</div>
                <DisplayContent />
            </div>
        </div>
    )
}

export default Main;