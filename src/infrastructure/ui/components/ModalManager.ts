// infrastructure/ui/components/ModalManager.ts
import { IModalView } from "../../../presentation/ports/IModalView.js";
import { GameState } from "../../../domain/types/typesState.js";
import { UI_CONFIG } from "../../config/uiConfig.js";

export class ModalManager implements IModalView {

    showGameOver(state: GameState, secretWord: string): void {
        setTimeout(() => {
            const elements = this.getModalElements();
            if (!elements) return;

            this.setModalMessage(elements.message, state);
            this.setModalHeaderClass(elements.title, state);
            this.setSecretWord(elements.secretWordContainer, secretWord);
            this.showModal(elements.modal);
        }, UI_CONFIG.ANIMATION.FLIP_ANIMATION.AWAIT_DELAY);
    }


    public hideModal(): void {
        const elements = this.getModalElements();
        const modal = elements?.modal;
        if (!modal) return;
        
        this.closeModal(modal);
    }


    private getModalElements() {
        const modal = document.querySelector(UI_CONFIG.SELECTORS.MODAL_CONTAINER);
        const title = document.querySelector(UI_CONFIG.SELECTORS.MODAL_HEADER);
        const message = document.querySelector(UI_CONFIG.SELECTORS.MODAL_MESSAGE);
        const secretWordContainer = document.querySelector(UI_CONFIG.SELECTORS.MODAL_SECRET_WORD);

        if (!modal || !title || !message) return null;
        return { modal, title, message, secretWordContainer };
    }

    private setModalMessage(element: Element, state: GameState): void {
        const finalState = state as GameState.WON | GameState.LOST;
        element.textContent = UI_CONFIG.MODAL.MESSAGES[finalState] || '';
    }

    private setModalHeaderClass(element: Element, state: GameState): void {
        const allHeaderClasses = Object.values(UI_CONFIG.MODAL.HEADER_CLASSES).filter(Boolean) as string[];
        element.classList.remove(...allHeaderClasses);

        const headerClass = UI_CONFIG.MODAL.HEADER_CLASSES[state as GameState.WON | GameState.LOST];
        if (headerClass) element.classList.add(headerClass);
    }

    private setSecretWord(element: Element | null, secretWord: string): void {
        if (!element) return;
        element.textContent = secretWord;
    }

    private showModal(modal: Element): void {
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }

    private closeModal(modal: Element): void {
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }
}