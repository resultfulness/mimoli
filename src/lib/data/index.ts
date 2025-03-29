import type { LearnSet } from "$lib/types";
import DataProviderMock from "./mock";

export interface DataProvider {
    getSets: () => LearnSet[];
}

export default new DataProviderMock() as DataProvider;
