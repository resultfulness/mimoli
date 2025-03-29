import type { LearnSet, LearnSetOverview } from "$lib/types";
import DataProviderMock from "./mock";

export interface DataProvider {
    getSetOverviews: () => LearnSetOverview[];
    getSetById: (id: number) => LearnSet | undefined;
}

export default new DataProviderMock() as DataProvider;
