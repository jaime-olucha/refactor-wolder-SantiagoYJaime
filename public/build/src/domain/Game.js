import { GameState } from "../shared/types.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../shared/constants.js";
export class Game {
    _secretWord;
    _currentWord = "";
    _currentRow = 1;
    _currentCol = 0;
    _gameState = GameState.PLAYING;
    _validator;
    _ui;
    _wordProvider;
    constructor(wordProvider, validator, ui) {
        this._wordProvider = wordProvider;
        this._validator = validator;
        this._ui = ui;
        this._secretWord = wordProvider.getRandomWord();
    }
    initInternalState() {
        this._secretWord = this._wordProvider.getRandomWord();
        this._currentWord = "";
        this._currentRow = 1;
        this._currentCol = 0;
        this._gameState = GameState.PLAYING;
    }
    isGameActive() {
        return this._gameState === GameState.PLAYING;
    }
    addLetter(char) {
        if (!this.isGameActive())
            return;
        if (this._currentCol >= MAX_WORD_SIZE)
            return;
        this._currentWord += char;
        this._ui.drawLetter(this._currentRow, this._currentCol, char);
        this._currentCol++;
    }
    removeLetter() {
        if (!this.isGameActive())
            return;
        if (this._currentCol <= 0)
            return;
        this._currentCol--;
        this._currentWord = this._currentWord.slice(0, -1);
        this._ui.deleteLetter(this._currentRow, this._currentCol);
    }
    submitWord() {
        if (!this.isGameActive())
            return;
        if (this._currentCol < MAX_WORD_SIZE)
            return;
        const states = this._validator.validate(this._currentWord, this._secretWord);
        states.forEach((state, col) => {
            this._ui.changeCellState(this._currentRow, col, state);
            this._ui.changeKeyState(this._currentWord[col], state);
        });
        if (this._currentWord === this._secretWord) {
            this._gameState = GameState.WON;
            this._ui.onGameOver(GameState.WON, this._secretWord);
            return;
        }
        if (this._currentRow === MAX_ATTEMPTS) {
            this._gameState = GameState.LOST;
            this._ui.onGameOver(GameState.LOST, this._secretWord);
            return;
        }
        this._currentRow++;
        this._currentCol = 0;
        this._currentWord = "";
    }
    reset() {
        this._secretWord = this._wordProvider.getRandomWord();
        this._currentWord = "";
        this._currentRow = 1;
        this._currentCol = 0;
        this._gameState = GameState.PLAYING;
        this._ui.resetBoard();
    }
}
