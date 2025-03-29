import type { LearnSet, LearnSetOverview } from "$lib/types";
import SetControllerMock from "./mock";

export interface SetController {
    getSetOverviews: () => LearnSetOverview[];
    getSetById: (id: number) => LearnSet | undefined;
}

export default new SetControllerMock() as SetController;
