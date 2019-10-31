import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const LessonsOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Lessons" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("setContentInOverlap", "Lessons");
            } else {
                setContent.changeContent("setContentInOverlap", "Lessons");
                visibility.changeVisibility("activeOverlap", "Lessons");
            }
        }}>
            Lessons
        </div>
    )
}

export default LessonsOvlp;