import { LetterState, GameState } from "../../domain/types/typesState.js";
import { MAX_WORD_SIZE } from "../../shared/gameConfig.js";

export const UI_CONFIG = {
    CSS_CLASSES: {
        [LetterState.CORRECT]: 'cell-green',
        [LetterState.PRESENT]: 'cell-orange',
        [LetterState.ABSENT]: 'cell-grey',
        [LetterState.EMPTY]: ''
    } as Record<LetterState, string>,
    MODAL: {
        MESSAGES: {
            [GameState.WON]: 'Congratulations! You guessed the word.',
            [GameState.LOST]: 'You are dead! You have run out of attempts.'
        } as Partial<Record<GameState, string>>,

        HEADER_CLASSES: {
            [GameState.WON]: 'modal-header-won',
            [GameState.LOST]: 'modal-header-lost'
        } as Partial<Record<GameState, string>>,

        CLASSES: {
            HIDDEN: 'hidden',
            VISIBLE: 'visible',
            KEY_ACTIVE: 'key-active'
        }
    },

    SELECTORS: {
        VIRTUAL_ROW: '.row',
        VIRTUAL_KEY: '.key',
        VIRTUAL_CELL: '.cell',
        MODAL_CONTAINER: '#game-modal',
        MODAL_HEADER: '#modal-header',
        MODAL_MESSAGE: '#modal-message',
        MODAL_SECRET_WORD: '#modal-secret-word',
        PLAY_AGAIN_BTN: '.new-game'
    },

    ANIMATION: {
        FLIP_ANIMATION: {
            CLASS: 'flip',
            FLIP_DELAY: 150,
            AWAIT_DELAY: (MAX_WORD_SIZE - 1) * 150 + 300 + 50
        }
    }
};

export const ALL_STATE_CLASSES = Object.values(UI_CONFIG.CSS_CLASSES).filter(cssClass => cssClass !== ''); 