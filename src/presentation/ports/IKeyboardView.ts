import { LetterState } from "../../domain/types/typesState.js";

export interface IKeyboardView {
    changeKeyState(key: string, state: LetterState, column: number): void;
}