import { LetterState } from "./types.js";

export interface IWordValidator {
    validate(guess: string, target: string): LetterState[];
}