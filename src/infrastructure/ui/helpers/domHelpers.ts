import { LetterState } from "../../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../../config/uiConfig.js";

export function applyStateClass(element: Element, state: LetterState): void {
    element.classList.remove(...ALL_STATE_CLASSES);
    const stateClass = UI_CONFIG.CSS_CLASSES[state];
    if (stateClass) element.classList.add(stateClass);
}