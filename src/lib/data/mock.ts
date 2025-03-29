import type { LearnSet } from "$lib/types";
import type { DataProvider } from ".";

export default class DataProviderMock implements DataProvider {
    // {{{data
    data: LearnSet[] = [
        {
            id: 1,
            name: "toki pona"
        },
        {
            id: 2,
            name: "English Idioms"
        },
        {
            id: 3,
            name: "Spanish Verbs"
        },
        {
            id: 4,
            name: "Geography Capitals, and Their Populations and Maybe Even Flags"
        },
        {
            id: 5,
            name: "History Dates"
        },
        {
            id: 6,
            name: "Science Elements"
        },
        {
            id: 7,
            name: "Programming Concepts"
        },
        {
            id: 5,
            name: "History Dates"
        },
        {
            id: 6,
            name: "Science Elements"
        },
        {
            id: 7,
            name: "Programming Concepts"
        }
    ];
    // }}}

    getSets() { return this.data; }
}
