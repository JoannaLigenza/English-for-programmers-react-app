import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const ListeningOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Listening" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("setContentInOverlap", "Listening");
            } else {
                setContent.changeContent("setContentInOverlap", "Listening");
                visibility.changeVisibility("activeOverlap", "Listening");
            }
        }}>
            Listening
        </div>
    )
}

export default ListeningOvlp;