export const chooseAnswers = (currentWord, dictionary, numberOfAnswers, answerOption) => {
    const firstWord = currentWord;
    let answersSet = new Set();
    const randomI = Math.floor(Math.random()*numberOfAnswers);
    
    for (let i=0; i < 100; i++) {
        if (answersSet.size === numberOfAnswers) {
            break;
        }
        if (i === randomI) {
            answersSet.add(dictionary[firstWord][answerOption]);
        } else {
            const random = Math.floor(Math.random()*(dictionary.length-10));
            answersSet.add(dictionary[random][answerOption]);
            //console.log(dictionary[random]["translation"])
        }
    }
    const answers = [...answersSet];
    return answers;
}