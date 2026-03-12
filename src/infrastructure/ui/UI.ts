import { ICellView } from "../../presentation/ports/ICellView.js";
import { IKeyboardView } from "../../presentation/ports/IKeyboardView.js";
import { IModalView } from "../../presentation/ports/IModalView.js";
import { IResetView } from "../../presentation/ports/IResetView.js";
import { LetterState, GameState } from "../../domain/types/typesState.js";
import { CellManager } from "./components/CellManager.js";
import { KeyboardManager } from "./components/KeyboardManager.js";
import { ModalManager } from "./components/ModalManager.js";

export class UI implements ICellView, IKeyboardView, IModalView, IResetView {

    private readonly _cellManager: CellManager;
    private readonly _keyboardManager: KeyboardManager;
    private readonly _modalManager: ModalManager;

    constructor(cellManager: CellManager, keyboardManager: KeyboardManager, modalManager: ModalManager) {
        this._cellManager = cellManager;
        this._keyboardManager = keyboardManager;
        this._modalManager = modalManager;
    }

    drawLetter(row: number, column: number, letter: string): void {
        this._cellManager.drawLetter(row, column, letter);
    }

    deleteLetter(row: number, column: number): void {
        this._cellManager.deleteLetter(row, column);
    }

    changeCellState(row: number, column: number, state: LetterState): void {
        this._cellManager.changeCellState(row, column, state);
    }


    changeKeyState(key: string, state: LetterState, column: number): void {
        this._keyboardManager.changeKeyState(key, state, column);
    }


    showGameOver(state: GameState, secretWord: string): void {
        this._modalManager.showGameOver(state, secretWord);
    }

    resetGame(): void {
        this._cellManager.resetCells();
        this._keyboardManager.resetKeys();
        this._modalManager.hideModal();
    }
}