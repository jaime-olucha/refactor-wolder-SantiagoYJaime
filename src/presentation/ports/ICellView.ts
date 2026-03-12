import { LetterState } from "../../domain/types/typesState.js";

export interface ICellView {
    drawLetter(row: number, column: number, letter: string): void;
    deleteLetter(row: number, column: number): void;
    changeCellState(row: number, column: number, state: LetterState): void;
}