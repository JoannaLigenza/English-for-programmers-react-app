import React, { useContext } from 'react';
import { VisibilityContext } from '../contexts/VisibilityContext.js';
import { SettingsContext } from '../contexts/SettingsContext.js';

const Settings = () => {
    const visibility = useContext(VisibilityContext);
    const getSettings = useContext(SettingsContext);
    return (
        <div className={visibility.isVisible.isOptionsVisible ? "settings visible" : "settings hidden"}>
            <div className="settings__language-options">
                <h3>Język:</h3>
                <div className={ getSettings.settings.language === "en-GB" ? "settings-button settings-button--pressed" : "settings-button"}
                    onClick={() => getSettings.setSettings("language", "en-GB")}> UK </div>
                <div className={ getSettings.settings.language === "en-GB" ? "settings-button" : "settings-button settings-button--pressed"}
                    onClick={() => getSettings.setSettings("language", "en-US")}> US </div>
            </div>
            <div className="settings__speak-rate-options">
                <h3>Prędkość mówienia</h3>
                <div>Normalna</div>
                <div>Wolna</div>
            </div>
            <div className="settings__advanced-options">
                <h3>Zaawansowane opcje</h3>
                <div>Pokaż</div>
                <div>Ukryj</div>
            </div>
            <div className="settings__word-number">
                <h3>Ilość słów w lekcji</h3>
                <div>3</div>
                <div>5</div>
                <div>10</div>
                <div>20</div>
                <div>30</div>
            </div>
        </div>
    )
}

export default Settings;