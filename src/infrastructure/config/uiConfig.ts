import { LetterState, GameState } from "../../shared/types";

export const UI_CONFIG = {
    CSS_CLASSES: {
        [LetterState.CORRECT]: 'cell-green',
        [LetterState.PRESENT]: 'cell-orange',
        [LetterState.ABSENT]: 'cell-grey',
        [LetterState.EMPTY]: ''
    } as Record<LetterState, string>,

    ROUTES: {
        WON: '/winner',
        LOST: '/loser'
    } as Partial<Record<GameState, string>>,

    SELECTORS: {
        VIRTUAL_KEY: '.key'
    }
};

export const ALL_STATE_CLASSES = Object.values(UI_CONFIG.CSS_CLASSES).filter(cssClass => cssClass !== '');