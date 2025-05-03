import type { LearnCard, LearnSet, LearnSetOverview } from "$lib/types";
import SetControllerLocal from "./local";

export interface SetController {
    addSet: (setname: string) => Promise<number>;
    delSet: (id: number) => Promise<void>;
    getSet: (id: number) => Promise<LearnSet>;
    renameSet: (id: number, setname: string) => Promise<void>;
    getSetOverviews: () => Promise<LearnSetOverview[]>;
    setAddCard: (setId: number, front: string, back: string) => Promise<void>;
    setDelCard: (setId: number, cardId: number) => Promise<void>;
    setEditCard: (setId: number, cardId: number, front: string, back: string) => Promise<void>;
}

const setController = new SetControllerLocal() as SetController;
export default setController;
