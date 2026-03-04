export var GameState;
(function (GameState) {
    GameState["PLAYING"] = "PLAYING";
    GameState["WON"] = "WON";
    GameState["LOST"] = "LOST";
})(GameState || (GameState = {}));
export var LetterState;
(function (LetterState) {
    LetterState["CORRECT"] = "CORRECT";
    LetterState["PRESENT"] = "PRESENT";
    LetterState["ABSENT"] = "ABSENT";
    LetterState["EMPTY"] = "EMPTY";
})(LetterState || (LetterState = {}));
