import { GameState } from "../shared/types.js";
import { IGameUI } from "../shared/IGameUI.js";
import { IWordProvider } from "../shared/IWordProvider.js";
import { IWordValidator } from "../shared/IWordValidator.js";
import { MAX_WORD_SIZE, MAX_ATTEMPTS } from "../shared/constants.js";

export class Game {
    private _secretWord: string;
    private _currentWord: string = "";
    private _currentRow: number = 1;
    private _currentCol: number = 0;
    private _gameState: GameState = GameState.PLAYING;
    private readonly _validator: IWordValidator;
    private readonly _ui: IGameUI;
    private readonly _wordProvider: IWordProvider;

    constructor(wordProvider: IWordProvider, validator: IWordValidator, ui: IGameUI) {
        this._wordProvider = wordProvider;
        this._validator = validator;
        this._ui = ui;
        this._secretWord = wordProvider.getRandomWord();
    }

    private initInternalState(): void {
        this._secretWord = this._wordProvider.getRandomWord();
        this._currentWord = "";
        this._currentRow = 1;
        this._currentCol = 0;
        this._gameState = GameState.PLAYING;
    }

    private isGameActive(): boolean {
        return this._gameState === GameState.PLAYING
    }

    public addLetter(char: string): void {
        if (!this.isGameActive()) return;
        if (this._currentCol >= MAX_WORD_SIZE) return;

        this._currentWord += char;
        this._ui.drawLetter(this._currentRow, this._currentCol, char);
        this._currentCol++;
    }

    public removeLetter(): void {
        if (!this.isGameActive()) return;
        if (this._currentCol <= 0) return;

        this._currentCol--;
        this._currentWord = this._currentWord.slice(0, -1);
        this._ui.deleteLetter(this._currentRow, this._currentCol);
    }

    public submitWord(): void {
        if (!this.isGameActive()) return;
        if (this._currentCol < MAX_WORD_SIZE) return;
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

    public reset(): void {
        this._secretWord = this._wordProvider.getRandomWord();
        this._currentWord = "";
        this._currentRow = 1;
        this._currentCol = 0;
        this._gameState = GameState.PLAYING;
        this._ui.resetBoard();
    }
}   