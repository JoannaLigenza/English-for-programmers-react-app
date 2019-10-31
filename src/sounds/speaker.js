// set speaking
const speak = (text, lang, speed) => {
    // if speaking is in progress don't invoke utterance again
    if (speechSynthesis.speaking) {
        return;
    }
    let rate = 1;
    if (speed === "slow") {
        if (lang === "en-GB") {
            rate = 0.7;
        }
        if (lang === "en-US") {
            rate = 0.4;
        }
    }
    //speech functionality (utterance - przemowienie)
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
}

export default speak;