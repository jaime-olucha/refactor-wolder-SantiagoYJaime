import { IInputHandler } from "../../presentation/ports/IInputHandler.js";
import { normalize } from "../../shared/utils.js";
import { UI_CONFIG } from "../config/uiConfig.js"; 

export class InputManager {
    private readonly _controller: IInputHandler;

    constructor(controller: IInputHandler) {
        this._controller = controller;
        this.initPhysicalKeyboard();
        this.initVirtualKeyboard();
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
            const normalizedKey = this.toUpperKey(event.key);
            
            this._controller.handleInput(normalizedKey);

            const virtualButton = this.getVirtualButton(event.key);
            if (virtualButton) {
                virtualButton.classList.add(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
            }
        });

        document.addEventListener("keyup", (event: KeyboardEvent) => {
            const virtualButton = this.getVirtualButton(event.key);
            if (virtualButton) {
                virtualButton.classList.remove(UI_CONFIG.MODAL.CLASSES.KEY_ACTIVE);
            }
        });
    }

    private initVirtualKeyboard(): void {
        const virtualKeys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        
        virtualKeys.forEach(button => {
            button.addEventListener("click", (event) => {
                const target = event.target as HTMLButtonElement;
                const normalizedKey = this.toUpperKey(target.value);
                
                this._controller.handleInput(normalizedKey);
                target.blur(); 
            });
        });
    }
}