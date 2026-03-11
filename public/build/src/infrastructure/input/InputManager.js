import { normalize } from "../../shared/utils.js";
import { UI_CONFIG } from "../config/uiConfig.js";
export class InputManager {
    _controller;
    constructor(controller) {
        this._controller = controller;
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
        this.initNewGameButtons();
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
            const normalizedKey = this.toUpperKey(event.key);
            this._controller.handleInput(normalizedKey);
            const virtualButton = this.getVirtualButton(event.key);
            if (virtualButton) {
                virtualButton.classList.add(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
            }
        });
        document.addEventListener("keyup", (event) => {
            const virtualButton = this.getVirtualButton(event.key);
            if (virtualButton) {
                virtualButton.classList.remove(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
            }
        });
    }
    initVirtualKeyboard() {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                const normalizedKey = this.toUpperKey(target.value);
                this._controller.handleInput(normalizedKey);
                target.blur();
            });
        });
    }
    initNewGameButtons() {
        const buttons = document.querySelectorAll(UI_CONFIG.SELECTORS.PLAY_AGAIN_BTN);
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                this._controller.handleRestart();
                btn.blur();
            });
        });
    }
}
