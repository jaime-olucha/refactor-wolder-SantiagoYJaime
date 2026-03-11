export class LocalWordRepository {
    _wordsDb = [
        "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE",
        "PLAYA", "PLATA", "ARBOL", "QUESO", "NIÑOS"
    ];
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this._wordsDb.length);
        return this._wordsDb[randomIndex];
    }
}
