import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const WritingOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Writing" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("Writing");
            } else {
                setContent.changeContent("Writing");
                visibility.changeVisibility("activeOverlap", "Writing");
            }
        }}>
            Writing
        </div>
    )
}

export default WritingOvlp;