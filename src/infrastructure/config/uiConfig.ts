import { LetterState, GameState } from "../../shared/types.js";

export const UI_CONFIG = {
    CSS_CLASSES: {
        [LetterState.CORRECT]: 'cell-green',
        [LetterState.PRESENT]: 'cell-orange',
        [LetterState.ABSENT]: 'cell-grey',
        [LetterState.EMPTY]: ''
    } as Record<LetterState, string>,
    MODAL: {
        MESSAGES: {
            WON: 'Congratulations! You guessed the word.',
            LOST: 'You are dead! You have run out of attempts.'
        } as Partial<Record<GameState, string>>,
        CLASSES: {
            HIDDEN: 'hidden', 
            VISIBLE: 'visible',
            HEADER_WON: 'modal-header-won',
            HEADER_LOST: 'modal-header-lost'
        }
    },
    
    SELECTORS: {
        VIRTUAL_KEY: '.key',
        VIRTUAL_CELL: '.cell',
        MODAL_CONTAINER: '#game-modal', 
        MODAL_HEADER: '#modal-header',
        MODAL_MESSAGE: '#modal-message',
        PLAY_AGAIN_BTN: '#play-again-btn'
    }
};

export const ALL_STATE_CLASSES = Object.values(UI_CONFIG.CSS_CLASSES).filter(cssClass => cssClass !== ''); 