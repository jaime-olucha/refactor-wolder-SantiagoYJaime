import { LetterState } from "../shared/types.js";

export class WordValidator {
    /**
     * Compara una suposición contra la palabra objetivo.
     * Implementa el algoritmo de dos pases para manejar letras repetidas.
     */
    public validate(guess: string, target: string): LetterState[] {
        const result: LetterState[] = Array(target.length).fill(LetterState.ABSENT);
        const targetLetters = target.split("");
        const guessLetters = guess.split("");

        // Paso 1: Marcar Verdes (Correctas)
        this.markCorrectLetters(guessLetters, targetLetters, result);
        
        // Paso 2: Marcar Amarillos (Presentes)
        this.markPresentLetters(guessLetters, targetLetters, result);

        return result;
    }

    private markCorrectLetters(guess: string[], target: string[], result: LetterState[]): void {
        guess.forEach((letter, i) => {
            if (letter !== "" && letter === target[i]) {
                result[i] = LetterState.CORRECT;
                target[i] = ""; // Consumimos la letra del objetivo
                guess[i] = "";  // Consumimos la letra del intento
            }
        });
    }

    private markPresentLetters(guess: string[], target: string[], result: LetterState[]): void {
        guess.forEach((letter, i) => {
            if (letter === "") return; // Ya fue marcada como verde

            const matchIndex = target.indexOf(letter);
            if (matchIndex !== -1) {
                result[i] = LetterState.PRESENT;
                target[matchIndex] = ""; // Consumimos para evitar duplicados amarillos
            }
        });
    }
}

