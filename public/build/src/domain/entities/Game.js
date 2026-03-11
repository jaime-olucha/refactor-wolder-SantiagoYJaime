import { GameState } from "../types/typesState.js";
import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../../shared/gameConfig.js";
export class Game {
    _secretWord;
    _currentWord = "";
    _guesses = [];
    _gameState = GameState.PLAYING;
    _maxAttempts;
    _maxWordSize;
    constructor(secretWord, maxAttempts = MAX_ATTEMPTS, maxWordSize = MAX_WORD_SIZE) {
        this._secretWord = secretWord;
        this._maxAttempts = maxAttempts;
        this._maxWordSize = maxWordSize;
    }
    get secretWord() { return this._secretWord; }
    get currentWord() { return this._currentWord; }
    get gameState() { return this._gameState; }
    get guesses() { return [...this._guesses]; }
    get maxAttempts() { return this._maxAttempts; }
    get maxWordSize() { return this._maxWordSize; }
    isGameOver() {
        return this._gameState !== GameState.PLAYING;
    }
    canAddLetter() {
        return !this.isGameOver() && this._currentWord.length < this.maxWordSize;
    }
    addLetter(char) {
        if (this.canAddLetter())
            this._currentWord += char;
    }
    canRemoveLetter() {
        return !this.isGameOver() && this._currentWord.length > 0;
    }
    removeLetter() {
        if (this.canRemoveLetter())
            this._currentWord = this._currentWord.slice(0, -1);
    }
    canSubmit() {
        return !this.isGameOver() && this._currentWord.length === this._maxWordSize;
    }
    submitWord() {
        if (!this.canSubmit())
            return;
        this.registerGuess();
        this.updateGameState();
        this.resetCurrentWord();
    }
    registerGuess() {
        this._guesses.push(this._currentWord);
    }
    updateGameState() {
        if (this.hasWon()) {
            this._gameState = GameState.WON;
        }
        else if (this.hasLost()) {
            this._gameState = GameState.LOST;
        }
    }
    resetCurrentWord() {
        this._currentWord = "";
    }
    hasWon() {
        return this._currentWord === this._secretWord;
    }
    hasLost() {
        return this._guesses.length >= this._maxAttempts;
    }
    reset(newSecretWord) {
        this._secretWord = newSecretWord;
        this._guesses = [];
        this.resetCurrentWord();
        this._gameState = GameState.PLAYING;
    }
}
