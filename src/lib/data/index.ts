import type { LearnCard, LearnSet, LearnSetOverview } from "$lib/types";
import SetControllerMock from "./mock";

export interface SetController {
    getSetOverviews: () => LearnSetOverview[];
    getSetById: (id: number) => LearnSet | undefined;
    deleteSetById: (id: number) => void;
    updateSetCardByIdByIndex: (id: number, cardIndex: number, newCard: LearnCard) => void;
    addCardToSet: (id: number, newCard: LearnCard) => void;
}

export default new SetControllerMock() as SetController;
