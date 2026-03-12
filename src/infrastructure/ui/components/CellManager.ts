import { ICellView } from "../../../presentation/ports/ICellView.js";
import { LetterState } from "../../../domain/types/typesState.js";
import { UI_CONFIG, ALL_STATE_CLASSES } from "../../config/uiConfig.js";
import { applyStateClass } from "../helpers/domHelpers.js";

export class CellManager implements ICellView {

    drawLetter(row: number, column: number, letter: string): void {
        this.withCell(row, column, cell => cell.textContent = letter);
    }

    deleteLetter(row: number, column: number): void {
        this.withCell(row, column, cell => cell.textContent = '');
    }

    changeCellState(row: number, column: number, state: LetterState): void {
        const delay = column * UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY;

        this.withCell(row, column, cell => {
            setTimeout(() => {
                cell.classList.add(UI_CONFIG.ANIMATION.FLIP_ANIMATION.CLASS);
                applyStateClass(cell, state);
            }, delay);
        });
    }


    public resetCells(): void {
        const allCells = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);

        allCells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove(...ALL_STATE_CLASSES, UI_CONFIG.ANIMATION.FLIP_ANIMATION.CLASS);
            (cell as HTMLElement).style.animationDelay = '0ms';
        });
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
}