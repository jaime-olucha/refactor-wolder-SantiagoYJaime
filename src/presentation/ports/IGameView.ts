import { LetterState, GameState } from "../../domain/types/typesState";

export interface IGameView {
    drawLetter(row: number, column: number, letter: string): void;
    deleteLetter(row: number, column: number): void;
    changeCellState(row: number, column: number, state: LetterState): void;
    changeKeyState(key: string, state: LetterState, column: number): void;
    showGameOver(state: GameState, secretWord: string): void;
    resetGame(): void;
}
