import { UI_CONFIG } from "./config/uiConfig.js";
import { normalize } from "../shared/utils.js";
export class InputManager {
    onKeyPress;
    onNewGame;
    constructor(onKeyPress, onNewGame) {
        this.onKeyPress = onKeyPress;
        this.onNewGame = onNewGame;
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
        this.initNewGameButton();
    }
    toUpperKey(key) {
        return normalize(key);
    }
    getVirtualButton(key) {
        const normalizedKey = this.toUpperKey(key);
        return document.querySelector(`${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${normalizedKey}"]`);
    }
    initPhysicalKeyboard() {
        document.addEventListener("keydown", (event) => {
            this.onKeyPress(this.toUpperKey(event.key));
            const virtualButton = this.getVirtualButton(event.key);
            if (!virtualButton)
                return;
            virtualButton.classList.add(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
        });
        document.addEventListener("keyup", (event) => {
            const virtualButton = this.getVirtualButton(event.key);
            if (!virtualButton)
                return;
            virtualButton.classList.remove(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
        });
    }
    initVirtualKeyboard() {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                const normalizedKey = this.toUpperKey(target.value);
                this.onKeyPress(normalizedKey);
                target.blur();
            });
        });
    }
    initNewGameButton() {
        const buttons = document.querySelectorAll(UI_CONFIG.SELECTORS.PLAY_AGAIN_BTN);
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                this.onNewGame();
                target.blur();
            });
        });
    }
}
