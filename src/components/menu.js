import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'
import Settings from './settings.js';
import LessonsOvlp from './ovlpLessons.js';
import ReadingOvlp from './ovlpReading.js';
import ListeningOvlp from './ovlpListening.js';
import WritingOvlp from './ovlpWriting.js';
import TestOvlp from './ovlpTest.js';

const Menu = () => {
    const visibility = useContext(VisibilityContext);
    console.log(visibility.isVisible)
    return (
        <div className="menu">
            <header className="header">

            </header>
            <Settings />
            <div className={visibility.isVisible.isOptionsVisible ? "showSettings settingsOpened" : "showSettings"} onClick={() => visibility.changeVisibility("settings")}> X </div>
            <LessonsOvlp />
            <ReadingOvlp />
            <ListeningOvlp />
            <WritingOvlp />
            <TestOvlp />
        </div>
    )
}

export default Menu;