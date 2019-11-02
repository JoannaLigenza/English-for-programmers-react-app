import React, { useContext } from 'react';
import { MainContentContext } from '../contexts/MainContentContext.js';

const TestThree = () => {
    const setContent = useContext(MainContentContext);
    return (
        <div className="testSection" >
            TestThree
        </div>
    )
}

export default TestThree;