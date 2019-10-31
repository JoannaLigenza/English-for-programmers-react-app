import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const TestOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Test" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("setContentInOverlap", "Test");
            } else {
                setContent.changeContent("setContentInOverlap", "Test");
                visibility.changeVisibility("activeOverlap", "Test");
            }
        }}>
            Test
        </div>
    )
}

export default TestOvlp;