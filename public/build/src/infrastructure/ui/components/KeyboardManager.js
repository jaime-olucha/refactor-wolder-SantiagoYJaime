import { LetterState } from "../../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../../config/uiConfig.js";
import { applyStateClass } from "../helpers/domHelpers.js";
export class KeyboardManager {
    changeKeyState(key, state, column) {
        const delay = column * UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY;
        setTimeout(() => {
            const button = document.querySelector(`${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${key.toUpperCase()}"]`);
            if (!button)
                return;
            const classCorrect = UI_CONFIG.CSS_CLASSES[LetterState.CORRECT];
            const classPresent = UI_CONFIG.CSS_CLASSES[LetterState.PRESENT];
            const isCurrentlyCorrect = button.classList.contains(classCorrect);
            const isCurrentlyPresent = button.classList.contains(classPresent);
            if (isCurrentlyCorrect)
                return;
            if (isCurrentlyPresent && state !== LetterState.CORRECT)
                return;
            applyStateClass(button, state);
        }, delay);
    }
    resetKeys() {
        const keys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        keys.forEach(key => key.classList.remove(...ALL_STATE_CLASSES));
    }
}
