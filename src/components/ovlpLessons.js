import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'

const LessonsOvlp = () => {
    const visibility = useContext(VisibilityContext);
    return (
        <div className="ovlp" onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
            }
        }}>
            Lessons
        </div>
    )
}

export default LessonsOvlp;