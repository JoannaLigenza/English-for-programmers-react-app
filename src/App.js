import React from 'react';
import './index.css';
import Menu from './components/menu.js';
import VisibilityContextProvider from './contexts/VisibilityContext.js';
import Main from './components/main.js';
import MainContentContextProvider from './contexts/MainContentContext.js';
import DictionaryContextProvider from './contexts/DictionaryContext.js';
import SettingsContextProvider from './contexts/SettingsContext.js';

function App() {
    return (
        <div className="app">
            <SettingsContextProvider>
                <VisibilityContextProvider>
                    <MainContentContextProvider>
                        <DictionaryContextProvider>
                            <Menu />
                            <Main />
                        </DictionaryContextProvider>
                    </MainContentContextProvider>
                </VisibilityContextProvider>
            </SettingsContextProvider>
        </div>
  );
}

export default App;
