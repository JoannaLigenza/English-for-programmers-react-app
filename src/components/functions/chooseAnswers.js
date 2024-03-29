export const chooseAnswers = (currentWord, dictionary, numberOfAnswers, answerOption, words, whichTest) => {
    const firstWord = currentWord;
    let answersSet = new Set();
    const randomI = Math.floor(Math.random()*numberOfAnswers);
    
    for (let i=0; i < 100; i++) {
        if (answersSet.size === numberOfAnswers) {
            break;
        }
        if (i === randomI) {
            // if words is NOT undefined it means, that this component is used by repetition component - testRepeat.js, else it is used by any other component
            if (words !== undefined) {
                if (whichTest === "repetition") {
                    answersSet.add(words[firstWord][0][answerOption]);
                } 
                if (whichTest === "favourites") {
                    answersSet.add(words[firstWord][answerOption]);
                } 
            } else {
                answersSet.add(dictionary[firstWord][answerOption]);
            }
            
        } else {
            const random = Math.floor(Math.random()*(dictionary.length));
            answersSet.add(dictionary[random][answerOption]);
        }
    }
    const answers = [...answersSet];
    return answers;
}