import { LetterState } from "../types/typesState.js";
import { IWordValidator } from "./IWordValidator.js";

export class WordValidator implements IWordValidator {
    
    public validate(guess: string, target: string): LetterState[] {
        const result: LetterState[] = Array(target.length).fill(LetterState.ABSENT);
        const targetLetters = target.split("");
        const guessLetters = guess.split("");

        
        this.markCorrectLetters(guessLetters, targetLetters, result);
        this.markPresentLetters(guessLetters, targetLetters, result);

        return result;
    }

    private markCorrectLetters(guess: string[], target: string[], result: LetterState[]): void {
        guess.forEach((letter, i) => {
            if (letter !== "" && letter === target[i]) {
                result[i] = LetterState.CORRECT;
                target[i] = ""; 
                guess[i] = "";  
            }
        });
    }

    private markPresentLetters(guess: string[], target: string[], result: LetterState[]): void {
        guess.forEach((letter, i) => {
            if (letter === "") return; 

            const matchIndex = target.indexOf(letter);
            if (matchIndex !== -1) {
                result[i] = LetterState.PRESENT;
                target[matchIndex] = ""; 
            }
        });
    }
}

