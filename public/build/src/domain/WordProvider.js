export class WordProvider {
    words;
    constructor(words) {
        this.words = words;
    }
    getRandomWord() {
        if (this.words.length === 0) {
            throw new Error("El listado de palabras está vacío.");
        }
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex].toUpperCase();
    }
}
