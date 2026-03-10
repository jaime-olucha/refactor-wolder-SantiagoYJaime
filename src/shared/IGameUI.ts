import { LetterState, GameState } from '../domain/types/typesState.js';

export interface IGameUI {
    drawLetter(row: number, col: number, letter: string): void;
    deleteLetter(row: number, col: number): void;
    changeCellState(row: number, col: number, state: LetterState): void;
    changeKeyState(key: string, state: LetterState): void;
    onGameOver(state: GameState, secretWord: string): void;
    resetBoard():void
}