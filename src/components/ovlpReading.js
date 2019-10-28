import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const ReadingOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Reading" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("Reading");
            } else {
                setContent.changeContent("Reading");
                visibility.changeVisibility("activeOverlap", "Reading");
            }
        }}>
            Reading
        </div>
    )
}

export default ReadingOvlp;