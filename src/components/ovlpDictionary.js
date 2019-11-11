import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { MainContentContext } from '../contexts/MainContentContext.js';

const DictionaryOvlp = () => {
    const visibility = useContext(VisibilityContext);
    const setContent = useContext(MainContentContext);
    const activeOverlap = visibility.isVisible.activeOverlap
    return (
        <div className={activeOverlap === "Dictionary" ? "ovlp ovlp--active" : "ovlp"} onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
                setContent.changeContent("setContentInOverlap", "Dictionary");
            } else {
                setContent.changeContent("setContentInOverlap", "Dictionary");
                visibility.changeVisibility("activeOverlap", "Dictionary");
            }
        }}>
            Dictionary
        </div>
    )
}

export default DictionaryOvlp;