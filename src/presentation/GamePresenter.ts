import { IGamePresenter } from "../application/ports/IGamePresenter.js";
import { IGameViews } from "./ports/IGameViews.js";
import { LetterState, GameState } from "../domain/types/typesState.js";

export class GamePresenter implements IGamePresenter {
    private readonly _views: IGameViews;

    constructor(views: IGameViews) {
        this._views = views;
    }

    presentLetterAdded(row: number, column: number, letter: string): void {
        this._views.cell.drawLetter(row, column, letter);
    }

    presentLetterRemoved(row: number, column: number): void {
        this._views.cell.deleteLetter(row, column);
    }

    presentWordValidated(row: number, states: LetterState[], guess: string): void {
        states.forEach((state, column) => this.presentLetterState(row, column, state, guess[column]));
    }

    presentGameOver(state: GameState, secretWord: string): void {
        this._views.modal.showGameOver(state, secretWord);
    }

    presentGameReset(): void {
        this._views.reset.resetGame();
    }

    private presentLetterState(row: number, column: number, state: LetterState, letter: string): void {
        this._views.cell.changeCellState(row, column, state);
        this._views.keyboard.changeKeyState(letter, state, column);
    }
}