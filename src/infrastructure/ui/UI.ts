import { IGameView } from "../../presentation/ports/IGameView.js";
import { LetterState, GameState } from "../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../config/uiConfig.js";

export class UI implements IGameView {
    drawLetter(row: number, column: number, letter: string): void {
        this.withCell(row, column, cell => cell.textContent = letter);
    }

    deleteLetter(row: number, column: number): void {
        this.withCell(row, column, cell => cell.textContent = '');
    }

    changeCellState(row: number, column: number, state: LetterState): void {
        this.withCell(row, column, cell => this.applyStateClass(cell, state));
    }

    changeKeyState(key: string, state: LetterState): void {
        const button = document.querySelector(
            `${UI_CONFIG.SELECTORS.VIRTUAL_KEY}[value="${key.toUpperCase()}"]`
        );
        if (button) this.applyStateClass(button, state);
    }

    showGameOver(state: GameState, secretWord: string): void {
        const elements = this.getModalElements();
        if (!elements) return;

        this.setModalMessage(elements.message, state);
        this.setModalHeaderClass(elements.title, state);
        this.setSecretWord(elements.secretWordContainer, state, secretWord);
        this.showModal(elements.modal);
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

    private setSecretWord(element: Element | null, state: GameState, secretWord: string): void {
        if (!element) return;
        element.textContent = state === GameState.LOST ? secretWord : '';
    }

    private showModal(modal: Element): void {
        modal.classList.remove(UI_CONFIG.MODAL.CLASSES.HIDDEN);
        modal.classList.add(UI_CONFIG.MODAL.CLASSES.VISIBLE);
    }


    private getCell(row: number, column: number): HTMLElement | null {
        const rows = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_ROW);
        const targetRow = rows[row - 1];

        if (!targetRow) return null;

        const cells = targetRow.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);
        return cells[column] as HTMLElement;
    }

    private withCell(row: number, column: number, action: (cell: HTMLElement) => void): void {
        const cell = this.getCell(row, column);
        if (cell) action(cell);
    }

    private applyStateClass(element: Element, state: LetterState): void {
        element.classList.remove(...ALL_STATE_CLASSES);
        const stateClass = UI_CONFIG.CSS_CLASSES[state];
        if (stateClass) element.classList.add(stateClass);
    }
}