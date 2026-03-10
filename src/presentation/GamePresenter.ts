import { IGamePresenter } from "../application/ports/IGamePresenter.js";
import { IGameView } from "./views/IGameView.js";
import { LetterState, GameState } from "../domain/types/typesState.js";

export class GamePresenter implements IGamePresenter {
    private readonly _view: IGameView;

    constructor(view: IGameView) {
        this._view = view;
    }

    public presentLetterAdded(row: number, column: number, letter: string): void {
        this._view.drawLetter(row, column, letter);
    }

    public presentLetterRemoved(row: number, column: number): void {
        this._view.deleteLetter(row, column);
    }

    public presentWordValidated(row: number, states: LetterState[], guess: string): void {
        states.forEach((state, col) => {
            this._view.changeCellState(row, col, state);
            this._view.changeKeyState(guess[col], state);
        });
    }

    public presentGameOver(state: GameState, secretWord: string): void {
        this._view.showGameOver(state, secretWord);
    }
}