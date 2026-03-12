import { UI_CONFIG, ALL_STATE_CLASSES } from "../../config/uiConfig.js";
import { applyStateClass } from "../helpers/domHelpers.js";
export class CellManager {
    drawLetter(row, column, letter) {
        this.withCell(row, column, cell => cell.textContent = letter);
    }
    deleteLetter(row, column) {
        this.withCell(row, column, cell => cell.textContent = '');
    }
    changeCellState(row, column, state) {
        const delay = column * UI_CONFIG.ANIMATION.FLIP_ANIMATION.FLIP_DELAY;
        this.withCell(row, column, cell => {
            setTimeout(() => {
                cell.classList.add(UI_CONFIG.ANIMATION.FLIP_ANIMATION.CLASS);
                applyStateClass(cell, state);
            }, delay);
        });
    }
    resetCells() {
        const allCells = document.querySelectorAll(UI_CONFIG.SELECTORS.VIRTUAL_CELL);
        allCells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove(...ALL_STATE_CLASSES, UI_CONFIG.ANIMATION.FLIP_ANIMATION.CLASS);
            cell.style.animationDelay = '0ms';
        });
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
}
