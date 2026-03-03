export class WordProvider {
    constructor(private readonly words: string[]) {}
    /**
     * Retorna una palabra aleatoria del listado disponible.
     */
    public getRandomWord(): string {
        if (this.words.length === 0) {
            throw new Error("El listado de palabras está vacío.");
        }
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex].toUpperCase();
    }
}