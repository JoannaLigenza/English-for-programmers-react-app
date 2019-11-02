import React, { useContext } from 'react';
import { MainContentContext } from '../contexts/MainContentContext.js';

const TestOne = () => {
    const setContent = useContext(MainContentContext);
    return (
        <div className="testSection" >
            sdfsf
        </div>
    )
}

export default TestOne;