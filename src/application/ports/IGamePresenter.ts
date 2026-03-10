import { LetterState, GameState } from "../../domain/types/typesState.js";

export interface IGamePresenter {
    presentLetterAdded(row: number, column: number, letter: string): void;
    presentLetterRemoved(row: number, column: number): void;
    presentWordValidated(row: number, states: LetterState[], guess: string): void;
    presentGameOver(state: GameState, secretWord: string): void;
}