import { LetterState, GameState } from "../../domain/types/typesState.js";

export interface IGamePresenter {
    presentLetterAdded(column: number, letter: string): void;
    presentLetterRemoved(column: number): void;
    presentWordValidated(row: number, states: LetterState[], guess: string): void;
    presentGameOver(state: GameState, secretWord: string): void;
}