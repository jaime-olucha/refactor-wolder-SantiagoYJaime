import { GameState } from "../types/typesState.js";

export class Game {
    private _secretWord: string;
    private _currentWord: string = "";
    private _guesses: string[] = [];
    private _gameState: GameState = GameState.PLAYING;
    private readonly _maxAttempts: number;
    private readonly _maxWordSize: number;

    constructor(secretWord: string, maxAttempts: number = 6, maxWordSize: number = 5) {
        this._secretWord = secretWord;
        this._maxAttempts = maxAttempts;
        this._maxWordSize = maxWordSize;
    }

    get secretWord(): string { return this._secretWord; }
    get currentWord(): string { return this._currentWord; }
    get gameState(): GameState { return this._gameState; }
    get guesses(): string[] { return [...this._guesses]; }
    get maxAttempts(): number { return this._maxAttempts; }
    get maxWordSize(): number { return this._maxWordSize; }

    private isGameOver(): boolean {
        return this._gameState !== GameState.PLAYING
    }

    public canAddLetter(): boolean {
        return !this.isGameOver() && this._currentWord.length < this.maxWordSize;
    }

    public addLetter(char: string): void {
        if (this.canAddLetter()) this._currentWord += char;
    }

    public canRemoveLetter(): boolean {
        return !this.isGameOver() && this._currentWord.length > 0;
    }

    public removeLetter(): void {
        if (this.canRemoveLetter()) this._currentWord = this._currentWord.slice(0, -1);
    }

    public canSubmit(): boolean {
        return !this.isGameOver() && this._currentWord.length === this._maxWordSize;
    }

    public submitWord(): void {
        if (!this.canSubmit()) return;

        this.registerGuess();
        this.updateGameState();
        this.resetCurrentWord();
    }

    private registerGuess(): void {
        this._guesses.push(this._currentWord);
    }

    private updateGameState(): void {
        if (this.hasWon()) {
            this._gameState = GameState.WON;
        } else if (this.hasLost()) {
            this._gameState = GameState.LOST;
        }
    }

    private resetCurrentWord(): void {
        this._currentWord = "";
    }

    private hasWon(): boolean {
        return this._currentWord === this._secretWord;
    }

    private hasLost(): boolean {
        return this._guesses.length >= this._maxAttempts;
    }

}   