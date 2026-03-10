import { IWordRepository } from "../../domain/repositories/IWordRepository";

export class LocalWordRepository implements IWordRepository {

    private readonly _wordsDb: string[] = [
        "JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE",
        "PLAYA", "PLATA", "ARBOL", "QUESO", "NIÑOS"
    ]

    public getRandomWord(): string {
        const randomIndex = Math.floor(Math.random() * this._wordsDb.length);
        return this._wordsDb[randomIndex];
    }
}