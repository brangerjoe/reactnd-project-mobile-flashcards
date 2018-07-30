import { AsyncStorage } from 'react-native';

const ASYNCSTORAGE_KEY = "Flashcards:decks"

export function getDecks() {
    return AsyncStorage.getItem(ASYNCSTORAGE_KEY);
}

export function saveDeck(key, entry) {
    return AsyncStorage.mergeItem(ASYNCSTORAGE_KEY, JSON.stringify({
        [key]: entry
    }));
}

export function saveCard(key, card) {
    return AsyncStorage.getItem(ASYNCSTORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[key].questions.push(card);
            AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(data));
        });
}