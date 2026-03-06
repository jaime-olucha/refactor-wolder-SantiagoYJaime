import { UI_CONFIG } from "./config/uiConfig.js";
import { normalize } from "../shared/utils.js";

export class InputManager {

    constructor(
        private onKeyPress: (key: string) => void,
        private onNewGame: () => void
    ) {
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
        this.initNewGameButton();
    }

    private toUpperKey(key: string): string {
        return normalize(key);
    }

    private getVirtualButton(key: string): HTMLElement | null {
        const normalizedKey = this.toUpperKey(key);
        return document.querySelector(`${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${normalizedKey}"]`);
    }

    private initPhysicalKeyboard(): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.onKeyPress(this.toUpperKey(event.key));

            const virtualButton = this.getVirtualButton(event.key);
            if (!virtualButton) return
            virtualButton.classList.add(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
        });

        document.addEventListener("keyup", (event: KeyboardEvent) => {
            const virtualButton = this.getVirtualButton(event.key);
            if (!virtualButton) return
            virtualButton.classList.remove(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
        });
    }

    private initVirtualKeyboard(): void {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target as HTMLButtonElement;
                const normalizedKey = this.toUpperKey(target.value)
                this.onKeyPress(normalizedKey);
                target.blur();
            });
        });
    }

    private initNewGameButton(): void {
        const buttons = document.querySelectorAll(UI_CONFIG.SELECTORS.PLAY_AGAIN_BTN);
        buttons.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target as HTMLButtonElement;
                this.onNewGame()
                target.blur();
            });
        });
    }
}