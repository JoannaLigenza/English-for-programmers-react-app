import React, { useContext } from 'react';
import { MainContentContext } from '../contexts/MainContentContext.js';

const TestTwo = () => {
    const setContent = useContext(MainContentContext);
    return (
        <div className="testSection" >
            TestTwo;
        </div>
    )
}

export default TestTwo;