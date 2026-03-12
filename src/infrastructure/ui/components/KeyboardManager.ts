import { IKeyboardView } from "../../../presentation/ports/IKeyboardView.js";
import { LetterState } from "../../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../../config/uiConfig.js";
import { applyStateClass } from "../helpers/domHelpers.js";


export class KeyboardManager implements IKeyboardView {

    changeKeyState(key: string, state: LetterState, column: number): void {
        const delay = column * UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY;

        setTimeout(() => {
            const button = document.querySelector(
                `${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${key.toUpperCase()}"]`
            );
            if (!button) return;

            const classCorrect = UI_CONFIG.CSS_CLASSES[LetterState.CORRECT];
            const classPresent = UI_CONFIG.CSS_CLASSES[LetterState.PRESENT];

            const isCurrentlyCorrect = button.classList.contains(classCorrect);
            const isCurrentlyPresent = button.classList.contains(classPresent);

            if (isCurrentlyCorrect) return;
            if (isCurrentlyPresent && state !== LetterState.CORRECT) return;

            applyStateClass(button, state);
        }, delay);
    }


    public resetKeys(): void {
        const keys = document.querySelectorAll<HTMLButtonElement>(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        keys.forEach(key => key.classList.remove(...ALL_STATE_CLASSES));
    }
}