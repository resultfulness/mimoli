import type { LearnCard, LearnSet, LearnSetOverview } from "$lib/types";
import SetControllerMock from "./mock";

export interface SetController {
    addSet: (newSet: LearnSet) => Promise<number>;
    delSet: (id: number) => Promise<void>;
    getSet: (id: number) => Promise<LearnSet>;
    getSetOverviews: () => Promise<LearnSetOverview[]>;
    setAddCard: (setId: number, newCard: LearnCard) => Promise<void>;
    setDelCard: (setId: number, cardId: number) => Promise<void>;
    setEditCard: (setId: number, cardId: number, newCard: LearnCard) => Promise<void>;
}

const setController = new SetControllerMock() as SetController;
export default setController;
