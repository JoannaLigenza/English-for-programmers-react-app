import React from 'react';
import './index.css';
import Menu from './components/menu.js';
import VisibilityContextProvider from './contexts/VisibilityContext.js';
import Main from './components/main.js';

function App() {
    return (
        <div className="app">
            <VisibilityContextProvider>
                <Menu />
                <Main />
            </VisibilityContextProvider>
        </div>
  );
}

export default App;
