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
    initPhysicalKeyboard() {
        document.addEventListener("keydown", (event) => {
            this.onKeyPress(this.toUpperKey(event.key));
        });
    }
    initVirtualKeyboard() {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target;
                const normalizedKey = this.toUpperKey(target.value);
                this.onKeyPress(normalizedKey);
            });
        });
    }
    initNewGameButton() {
        const buttons = document.querySelectorAll(UI_CONFIG.SELECTORS.PLAY_AGAIN_BTN);
        buttons.forEach(button => {
            button.addEventListener("click", () => this.onNewGame());
        });
    }
}
