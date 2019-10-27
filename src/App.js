import React from 'react';
import './index.css';
import Menu from './components/menu.js';
import VisibilityContextProvider from './contexts/VisibilityContext.js';
import Main from './components/main.js';
import MainContentContextProvider from './contexts/MainContentContext.js';

function App() {
    return (
        <div className="app">
            <VisibilityContextProvider>
                <MainContentContextProvider>
                    <Menu />
                    <Main />
                </MainContentContextProvider>
            </VisibilityContextProvider>
        </div>
  );
}

export default App;
