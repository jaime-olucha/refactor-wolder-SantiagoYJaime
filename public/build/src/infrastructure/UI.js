import { LetterState } from "../shared/types.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "./config/uiConfig.js";
export class UI {
    drawLetter(row, column, letter) {
        const cell = this.getCellElement(row, column);
        if (cell)
            cell.textContent = letter;
    }
    deleteLetter(row, column) {
        const cell = this.getCellElement(row, column);
        if (cell)
            cell.textContent = "";
    }
    changeCellState(row, column, state) {
        const cell = this.getCellElement(row, column);
        if (!cell)
            return;
        const delay = column * UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY;
        cell.style.animationDelay = `${delay}ms`;
        cell.classList.add(UI_CONFIG.ANIMATION.FLIP_ANIMATION.CLASS);
        setTimeout(() => {
            if (cell.textContent !== "") {
                this.setElementState(cell, state);
            }
        }, delay + UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY);
    }
    changeKeyState(key, state) {
        const button = document.querySelector(`.key[value="${key}"]`);
        if (!button)
            return;
        const classCorrect = UI_CONFIG.CSS_CLASSES[LetterState.CORRECT];
        const classPresent = UI_CONFIG.CSS_CLASSES[LetterState.PRESENT];
        if (button.classList.contains(classCorrect)) {
            return;
        }
        if (button.classList.contains(classPresent) && state !== LetterState.CORRECT) {
            return;
        }
        this.setElementState(button, state);
    }
    onGameOver(state, secretWord) {
        const modal = this.getModalElement();
        const headerElement = document.querySelector(UI_CONFIG.SELECTORS.MODAL_HEADER);
        const messageElement = document.querySelector(UI_CONFIG.SELECTORS.MODAL_MESSAGE);
        const secretWordElement = document.querySelector(UI_CONFIG.SELECTORS.MODAL_SECRET_WORD);
        const message = UI_CONFIG.MODAL.MESSAGES[state];
        if (!modal || !messageElement || !headerElement || !message)
            return;
        setTimeout(() => {
            messageElement.textContent = message;
            if (secretWordElement)
                secretWordElement.textContent = secretWord;
            const allHeaderClasses = Object.values(UI_CONFIG.MODAL.HEADER_CLASSES);
            headerElement.classList.remove(...allHeaderClasses);
            const stateClass = UI_CONFIG.MODAL.HEADER_CLASSES[state];
            if (stateClass)
                headerElement.classList.add(stateClass);
            modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
            modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
        }, UI_CONFIG.ANIMATION.FLIP_ANIMATION.AWAIT_DELAY);
    }
    hideModal() {
        const modal = this.getModalElement();
        if (modal) {
            modal.classList.remove(UI_CONFIG.MODAL.CLASSES.VISIBLE);
            modal.classList.add(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        }
    }
    resetBoard() {
        this.resetCells();
        this.resetKeys();
        this.hideModal();
    }
    getCellElement(row, column) {
        const rowElement = document.getElementById(`row_${row}`);
        if (!rowElement)
            return null;
        return rowElement.children[column];
    }
    getModalElement() {
        return document.querySelector(UI_CONFIG.SELECTORS.MODAL_CONTAINER);
    }
    setElementState(element, state) {
        if (!element)
            return;
        element.classList.remove(...ALL_STATE_CLASSES);
        const classToAdd = UI_CONFIG.CSS_CLASSES[state];
        if (classToAdd)
            element.classList.add(classToAdd);
    }
    resetCells() {
        const allCells = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);
        allCells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove(...ALL_STATE_CLASSES, 'flip');
            cell.style.animationDelay = '0ms';
        });
    }
    resetKeys() {
        const keys = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        keys.forEach(key => key.classList.remove(...ALL_STATE_CLASSES));
    }
}
