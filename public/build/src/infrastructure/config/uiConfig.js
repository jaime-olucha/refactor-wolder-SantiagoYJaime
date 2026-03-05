import { LetterState, GameState } from "../../shared/types.js";
export const UI_CONFIG = {
    CSS_CLASSES: {
        [LetterState.CORRECT]: 'cell-green',
        [LetterState.PRESENT]: 'cell-orange',
        [LetterState.ABSENT]: 'cell-grey',
        [LetterState.EMPTY]: ''
    },
    MODAL: {
        MESSAGES: {
            [GameState.WON]: 'Congratulations! You guessed the word.',
            [GameState.LOST]: 'You are dead! You have run out of attempts.'
        },
        HEADER_CLASSES: {
            [GameState.WON]: 'modal-header-won',
            [GameState.LOST]: 'modal-header-lost'
        },
        CLASSES: {
            HIDDEN: 'hidden',
            VISIBLE: 'visible',
            KEY_ACTIVE: 'key-active'
        }
    },
    SELECTORS: {
        VIRTUAL_KEY: '.key',
        VIRTUAL_CELL: '.cell',
        MODAL_CONTAINER: '#game-modal',
        MODAL_HEADER: '#modal-header',
        MODAL_MESSAGE: '#modal-message',
        MODAL_SECRET_WORD: '#modal-secret-word',
        PLAY_AGAIN_BTN: '.new-game'
    }
};
export const ALL_STATE_CLASSES = Object.values(UI_CONFIG.CSS_CLASSES).filter(cssClass => cssClass !== '');
