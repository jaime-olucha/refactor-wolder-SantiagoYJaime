import { GameState } from "../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../config/uiConfig.js";
export class UI {
    drawLetter(row, column, letter) {
        this.withCell(row, column, cell => cell.textContent = letter);
    }
    deleteLetter(row, column) {
        this.withCell(row, column, cell => cell.textContent = '');
    }
    changeCellState(row, column, state) {
        this.withCell(row, column, cell => this.applyStateClass(cell, state));
    }
    changeKeyState(key, state) {
        const button = document.querySelector(`${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${key.toUpperCase()}"]`);
        if (button)
            this.applyStateClass(button, state);
    }
    showGameOver(state, secretWord) {
        const elements = this.getModalElements();
        if (!elements)
            return;
        this.setModalMessage(elements.message, state);
        this.setModalHeaderClass(elements.title, state);
        this.setSecretWord(elements.secretWordContainer, state, secretWord);
        this.showModal(elements.modal);
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
    setSecretWord(element, state, secretWord) {
        if (!element)
            return;
        element.textContent = state === GameState.LOST ? secretWord : '';
    }
    showModal(modal) {
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }
    getCell(row, column) {
        const rows = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_ROW);
        const targetRow = rows[row - 1];
        if (!targetRow)
            return null;
        const cells = targetRow.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);
        return cells[column];
    }
    withCell(row, column, action) {
        const cell = this.getCell(row, column);
        if (cell)
            action(cell);
    }
    applyStateClass(element, state) {
        element.classList.remove(...ALL_STATE_CLASSES);
        const stateClass = UI_CONFIG.CSS_CLASSES[state];
        if (stateClass)
            element.classList.add(stateClass);
    }
}
