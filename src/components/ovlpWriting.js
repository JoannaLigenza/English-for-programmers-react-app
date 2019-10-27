import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js'

const WritingOvlp = () => {
    const visibility = useContext(VisibilityContext);
    return (
        <div className="ovlp" onClick={() => { 
            if (window.innerWidth < 700) { 
                visibility.changeVisibility("main"); 
            }
        }}>
            Writing
        </div>
    )
}

export default WritingOvlp;