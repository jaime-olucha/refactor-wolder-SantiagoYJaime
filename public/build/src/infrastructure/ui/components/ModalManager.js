import { UI_CONFIG } from "../../config/uiConfig.js";
export class ModalManager {
    showGameOver(state, secretWord) {
        setTimeout(() => {
            const elements = this.getModalElements();
            if (!elements)
                return;
            this.setModalMessage(elements.message, state);
            this.setModalHeaderClass(elements.title, state);
            this.setSecretWord(elements.secretWordContainer, secretWord);
            this.showModal(elements.modal);
        }, UI_CONFIG.ANIMATION.FLIP_ANIMATION.AWAIT_DELAY);
    }
    hideModal() {
        const elements = this.getModalElements();
        const modal = elements?.modal;
        if (!modal)
            return;
        this.closeModal(modal);
    }
    getModalElements() {
        const modal = document.querySelector(UI_CONFIG.SELECTORS.MODAL_CONTAINER);
        const title = document.querySelector(UI_CONFIG.SELECTORS.MODAL_HEADER);
        const message = document.querySelector(UI_CONFIG.SELECTORS.MODAL_MESSAGE);
        const secretWordContainer = document.querySelector(UI_CONFIG.SELECTORS.MODAL_SECRET_WORD);
        if (!modal || !title || !message)
            return null;
        return { modal, title, message, secretWordContainer };
    }
    setModalMessage(element, state) {
        const finalState = state;
        element.textContent = UI_CONFIG.MODAL.MESSAGES[finalState] || '';
    }
    setModalHeaderClass(element, state) {
        const allHeaderClasses = Object.values(UI_CONFIG.MODAL.HEADER_CLASSES).filter(Boolean);
        element.classList.remove(...allHeaderClasses);
        const headerClass = UI_CONFIG.MODAL.HEADER_CLASSES[state];
        if (headerClass)
            element.classList.add(headerClass);
    }
    setSecretWord(element, secretWord) {
        if (!element)
            return;
        element.textContent = secretWord;
    }
    showModal(modal) {
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }
    closeModal(modal) {
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }
}
