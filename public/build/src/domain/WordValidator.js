import { LetterState } from "../shared/types.js";
export class WordValidator {
    validate(guess, target) {
        const result = Array(target.length).fill(LetterState.ABSENT);
        const targetLetters = target.split("");
        const guessLetters = guess.split("");
        this.markCorrectLetters(guessLetters, targetLetters, result);
        this.markPresentLetters(guessLetters, targetLetters, result);
        return result;
    }
    markCorrectLetters(guess, target, result) {
        guess.forEach((letter, i) => {
            if (letter !== "" && letter === target[i]) {
                result[i] = LetterState.CORRECT;
                target[i] = "";
                guess[i] = "";
            }
        });
    }
    markPresentLetters(guess, target, result) {
        guess.forEach((letter, i) => {
            if (letter === "")
                return;
            const matchIndex = target.indexOf(letter);
            if (matchIndex !== -1) {
                result[i] = LetterState.PRESENT;
                target[matchIndex] = "";
            }
        });
    }
}
