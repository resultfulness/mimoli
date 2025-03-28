import type { LearnSet } from "$lib/types";

const data: LearnSet[] = [
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

interface LearnSetGetter {
    getSetList: () => LearnSet[]
}

class LearnSetGetterMock implements LearnSetGetter {
    getSetList() {
        return data;
    }
}

export default new LearnSetGetterMock() as LearnSetGetter;
