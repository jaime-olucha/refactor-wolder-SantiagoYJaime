import { UI_CONFIG } from "./config/uiConfig";

export class InputManager {
    constructor(private onKeyPress: (key: string) => void) {
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
    }

    private toUpperKey(key: string): string {
        return key.toUpperCase();
    }

    private initPhysicalKeyboard(): void {
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            this.onKeyPress(this.toUpperKey(event.key));
        });
    }

    private initVirtualKeyboard(): void {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target as HTMLButtonElement;
                this.onKeyPress(this.toUpperKey(target.value));
            });
        });
    }
}