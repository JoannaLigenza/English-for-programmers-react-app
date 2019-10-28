import React, { createContext, useState } from 'react';

export const DictionaryContext = createContext();

const DictionaryContextProvider = (props) => {
    const [dictionary, setDictionary] = useState([
        {word: "productivity", translation: "produktywność", spelling: "/ˌprɒdʌkˈtɪvəti/", meaning: "the rate at which goods are produced", examples: [["We need to increase productivity by 50%", "Musimy zwiększyć wydajność o 50%"],  ["productivity improvement", "poprawa wydajności"]], "partOfspeech": [["noun", "productivity"], ["adjective", "productive"]]},
        {word: "merge", translation: "połączenie, złączenie, łączyć (się)", spelling: "/mɜːdʒ/", meaning: "If two or more things merge, they combine or join, and if you merge two or more things, you combine or join them.", examples: [["he two companies merged, forming the largest brewery in Canada", "obie firmy połączyły się, tworząc największy browar w Kanadzie"],  ["Merge is the process of combining the various versions of a file or folder", "Scalanie to proces łączenia różnych wersji pliku lub folderu"]], "partOfspeech": [["noun", "merger"], ["verb", "merge"] ]},
        {word: "file", translation: "plik", spelling: "/faɪl/", meaning: "a piece of text, a picture, or a computer program stored on a computer", examples: [["Do you want to download all these files?", "Czy chcesz pobrać wszystkie te pliki?"], ["file sharing", "udostępnianie plików"]], "partOfspeech": [["noun", "file"],]},
    ]);
    const setDictionaryData = (content) => {
        setDictionary({content: content});
    }
    return (
        <DictionaryContext.Provider value={{ dictionary, setDictionaryData }} >
            {props.children}
        </DictionaryContext.Provider>
    )
}

export default DictionaryContextProvider;
