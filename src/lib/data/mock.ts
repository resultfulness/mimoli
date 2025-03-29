import type { LearnSet, LearnSetOverview } from "$lib/types";
import type { DataProvider } from ".";

export default class DataProviderMock implements DataProvider {
    // {{{data
    data: LearnSet[] = [
        {
            id: 1,
            name: "toki pona",
            cards: [],
        },
        {
            id: 2,
            name: "English Idioms",
            cards: [],
        },
        {
            id: 3,
            name: "Spanish Verbs",
            cards: [],
        },
        {
            id: 4,
            name: "Geography Capitals, and Their Populations and Maybe Even Flags",
            cards: [],
        },
        {
            id: 5,
            name: "History Dates",
            cards: [],
        },
        {
            id: 6,
            name: "Science Elements",
            cards: [],
        },
        {
            id: 7,
            name: "Programming Concepts",
            cards: [],
        },
        {
            id: 5,
            name: "History Dates",
            cards: [],
        },
        {
            id: 6,
            name: "Science Elements",
            cards: [],
        },
        {
            id: 7,
            name: "Programming Concepts",
            cards: [],
        }
    ];
    // }}}

    getSetOverviews() {
        return this.data.map(({ id, name }) => { return { id, name }; });
    }

    getSetById(id: number) {
        return this.data.find(v => v.id === id);
    }
}
