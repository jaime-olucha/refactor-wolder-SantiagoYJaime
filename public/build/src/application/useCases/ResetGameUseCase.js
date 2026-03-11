export class ResetGameUseCase {
    _repository;
    _presenter;
    constructor(repository, presenter) {
        this._repository = repository;
        this._presenter = presenter;
    }
    execute(game) {
        const newWord = this._repository.getRandomWord();
        game.reset(newWord);
        this._presenter.presentGameReset();
    }
}
