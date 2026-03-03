import { WordProvider } from "./domain/WordProvider.js";
import { Game } from "./domain/Game.js";
import { UI } from "./infrastructure/UI.js";
import { InputManager } from "./infrastructure/InputManager.js";
import { VALID_KEYS, COMMANDS, WORDS_DB } from "./shared/constants.js";

// 1. Inicialización de dependencias
const wordProvider = new WordProvider(WORDS_DB);
const pickedWord: string = wordProvider.getRandomWord();
const ui = new UI();
const game = new Game(pickedWord, ui);

const commands: Record<string, () => void> = {
    [COMMANDS.ENTER]: () => game.enterPressed(),
    [COMMANDS.BACKSPACE]: () => game.backspacePressed()
};

const handleKeyPress = (key: string):void => {
    if(commands[key]) return commands[key]();
    if(VALID_KEYS.includes(key)) return game.newLetter(key);
}
new InputManager(handleKeyPress);