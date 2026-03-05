import { WordProvider } from "./domain/WordProvider.js";
import { WordValidator } from "./domain/WordValidator.js";
import { Game } from "./domain/Game.js";
import { UI } from "./infrastructure/UI.js";
import { InputManager } from "./infrastructure/InputManager.js";
import { VALID_KEYS, COMMANDS, WORDS_DB } from "./shared/constants.js";

const wordProvider = new WordProvider(WORDS_DB);
const validator = new WordValidator();
const ui = new UI();
const game = new Game(wordProvider, validator, ui);

const commands: Record<string, () => void> = {
    [COMMANDS.ENTER]: () => game.submitWord(),
    [COMMANDS.BACKSPACE]: () => game.removeLetter()
};

const handleKeyPress = (key: string): void => {
    if (commands[key]) return commands[key]();
    if (VALID_KEYS.includes(key)) return game.addLetter(key);
}

new InputManager(handleKeyPress, () => game.reset());

