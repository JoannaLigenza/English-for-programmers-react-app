import React from 'react';
import './index.css';
import Menu from './components/menu.js';
import VisibilityContextProvider from './contexts/VisibilityContext.js';
import Main from './components/main.js';
import MainContentContextProvider from './contexts/MainContentContext.js';
import DictionaryContextProvider from './contexts/DictionaryContext.js';

function App() {
    return (
        <div className="app">
            <VisibilityContextProvider>
                <MainContentContextProvider>
                    <DictionaryContextProvider>
                        <Menu />
                        <Main />
                    </DictionaryContextProvider>
                </MainContentContextProvider>
            </VisibilityContextProvider>
        </div>
  );
}

export default App;
