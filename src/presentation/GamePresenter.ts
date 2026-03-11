import { IGamePresenter } from "../application/ports/IGamePresenter.js";
import { IGameView } from "./ports/IGameView.js";
import { LetterState, GameState } from "../domain/types/typesState.js";

export class GamePresenter implements IGamePresenter {
    private readonly _view: IGameView;

    constructor(view: IGameView) {
        this._view = view;
    }

    presentLetterAdded(row: number, column: number, letter: string): void {
        this._view.drawLetter(row, column, letter);
    }

    presentLetterRemoved(row: number, column: number): void {
        this._view.deleteLetter(row, column);
    }

    presentWordValidated(row: number, states: LetterState[], guess: string): void {
        states.forEach((state, column) => this.presentLetterState(row, column, state, guess[column]));
    }

    presentGameOver(state: GameState, secretWord: string): void {
        this._view.showGameOver(state, secretWord);
    }

    presentGameReset(): void {
        this._view.resetGame();
    }

    private presentLetterState(row: number, column: number, state: LetterState, letter: string): void {
        this._view.changeCellState(row, column, state);
        this._view.changeKeyState(letter, state, column);
    }
}