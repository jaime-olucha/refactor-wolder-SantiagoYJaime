import { Game } from "./domain/entities/Game.js";
import { WordValidator } from "./domain/services/WordValidator.js";
import { AddLetterUseCase } from "./application/useCases/AddLetterUseCase.js";
import { RemoveLetterUseCase } from "./application/useCases/RemoveLetterUseCase.js";
import { SubmitWordUseCase } from "./application/useCases/SubmitWordUseCase.js";
import { ResetGameUseCase } from "./application/useCases/ResetGameUseCase.js";
import { IGameUseCases } from "./application/ports/IGameUseCases.js";
import { CellManager } from "./infrastructure/ui/components/CellManager.js";
import { KeyboardManager } from "./infrastructure/ui/components/KeyboardManager.js";
import { ModalManager } from "./infrastructure/ui/components/ModalManager.js";
import { UI } from "./infrastructure/ui/UI.js";
import { InputManager } from "./infrastructure/input/InputManager.js";
import { LocalWordRepository } from "./infrastructure/repositories/LocalWordRepository.js";
import { GamePresenter } from "./presentation/GamePresenter.js";
import { IGameViews } from "./presentation/ports/IGameViews.js";
import { GameController } from "./presentation/GameController.js";

document.addEventListener('DOMContentLoaded', () => {

    const cellManager     = new CellManager();
    const keyboardManager = new KeyboardManager();
    const modalManager    = new ModalManager();
    const ui              = new UI(cellManager, keyboardManager, modalManager);

    const views: IGameViews = {
        cell: ui,
        keyboard: ui,
        modal: ui,
        reset: ui
    };

    const presenter = new GamePresenter(views);

    const repository = new LocalWordRepository();
    const validator  = new WordValidator();

    const useCases: IGameUseCases = {
        addLetter:  new AddLetterUseCase(presenter),
        removeLetter: new RemoveLetterUseCase(presenter),
        submitWord: new SubmitWordUseCase(validator, presenter),
        resetGame:  new ResetGameUseCase(repository, presenter)
    };

    const game = new Game(repository.getRandomWord());
    const controller = new GameController(game, useCases);
    new InputManager(controller);
});