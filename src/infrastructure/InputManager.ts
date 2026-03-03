import { UI_CONFIG } from "./config/uiConfig.js";
import { VALID_KEYS } from "../shared/constants.js";
import { normalize } from "../shared/utils.js";

export class InputManager {
    constructor(private onKeyPress: (key: string) => void) {
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
    }

    private toUpperKey(key: string): string {
        return normalize(key);
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
                const normalizedKey = this.toUpperKey(target.value)
                
                if(VALID_KEYS.includes(normalizedKey)) {
                    this.onKeyPress(normalizedKey);
                }
            });
        });
    }
}