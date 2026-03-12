import { ICellView } from "./ICellView.js";
import { IKeyboardView } from "./IKeyboardView.js";
import { IModalView } from "./IModalView.js";
import { IResetView } from "./IResetView.js";

export interface IGameViews {
    cell: ICellView;
    keyboard: IKeyboardView;
    modal: IModalView;
    reset: IResetView;
}