import { MAX_ATTEMPTS, MAX_WORD_SIZE } from "../shared/constants";
import { IGameUI } from "../shared/IGameUI";
import { GameState, LetterState } from "../shared/types";
import { UI_CONFIG, ALL_STATE_CLASSES } from "./config/uiConfig";

export class UI implements IGameUI {

    drawLetter(row: number, column: number, letter: string): void {
        const cell = this.getCellElement(row, column);
        if (cell) cell.textContent = letter
    }

    deleteLetter(row: number, column: number): void {
        const cell = this.getCellElement(row, column);
        if (cell) cell.textContent = "";
    }

    changeCellState(row: number, column: number, state: LetterState): void {
        const cell = this.getCellElement(row, column);
        if (cell) this.setElementState(cell, state);
    }

    changeKeyState(key: string, state: LetterState): void {
        const button = document.querySelector(`.key[value="${key}"]`) as HTMLButtonElement | null;
        if (!button) return;

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

    onGameOver(state: GameState): void {
        const modal = this.getModalElement();
        const messageElement = document.querySelector(UI_CONFIG.SELECTORS.MODAL_MESSAGE) as HTMLElement | null;

        const message = UI_CONFIG.MODAL.MESSAGES[state];

        if (modal && messageElement && message) {
            messageElement.textContent = message;
            modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
            modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
        }
    }

    hideModal(): void {
        const modal = this.getModalElement();
        if (modal) {
            modal.classList.remove(UI_CONFIG.MODAL.CLASSES.VISIBLE);
            modal.classList.add(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        }
    }

    resetBoard(): void {
        this.resetCells();
        this.resetKeys();
        this.hideModal();
    }

    private getCellElement(row: number, column: number): HTMLElement | null {
        const rowElement = document.getElementById(`row_${row}`);
        if (!rowElement) return null;

        return rowElement.children[column] as HTMLElement;
    }

    private getModalElement(): HTMLElement | null {
        return document.querySelector(UI_CONFIG.SELECTORS.MODAL_CONTAINER);
    }

    private setElementState(element: HTMLElement | null, state: LetterState): void {
        if (!element) return

        element.classList.remove(...ALL_STATE_CLASSES);
        const classToAdd = UI_CONFIG.CSS_CLASSES[state];
        if (classToAdd) element.classList.add(classToAdd);
    }

    private resetCells(): void {
        const allCells = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);
        
        allCells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove(...ALL_STATE_CLASSES);
        });
    }

    private resetKeys(): void {
        const keys = document.querySelectorAll<HTMLButtonElement>(UI_CONFIG.SELECTORS.VIRTUAL_KEY);
        keys.forEach(key => key.classList.remove(...ALL_STATE_CLASSES));
    }

}
