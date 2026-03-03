import { IGameUI } from "../shared/IGameUI";
import { GameState, LetterState } from "../shared/types";
import { UI_CONFIG, ALL_STATE_CLASSES } from "./config/uiConfig";

export class UI implements IGameUI {

    private getCellElement(row: number, column: number): HTMLElement | null {
        const rowElement = document.getElementById(`row_${row}`);
        if (!rowElement) return null;

        return rowElement.children[column] as HTMLElement;
    }

    private setElementState(element: HTMLElement | null, state: LetterState):void {
        if(!element) return

        element.classList.remove(...ALL_STATE_CLASSES);
        const classToAdd = UI_CONFIG.CSS_CLASSES[state];
        if(classToAdd) element.classList.add(classToAdd);
    }

    
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
        const route = UI_CONFIG.ROUTES[state];

        if (route) {
            window.location.assign(route);
        }
    }
}