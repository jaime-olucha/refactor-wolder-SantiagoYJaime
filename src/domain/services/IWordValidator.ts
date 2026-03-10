import { LetterState } from "../types/typesState.js";

export interface IWordValidator {
    validate(guess: string, target: string): LetterState[];
}