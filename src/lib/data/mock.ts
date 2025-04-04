import type { LearnSet, LearnSetOverview } from "$lib/types";
import type { SetController } from ".";

export default class SetControllerMock implements SetController {
    // {{{data
    data: LearnSet[] = [
        {
            id: 1,
            name: "toki pona",
            cards: [
                { front: "mi", back: "i, me, we, us" },
                { front: "sina", back: "you" },
                { front: "ona", back: "he, she, it, they" },
            ],
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
    ];
    // }}}

    getSetOverviews() {
        return this.data.map(({ id, name }) => {
            return { id, name } as LearnSetOverview;
        });
    }

    getSetById(id: number) {
        return this.data.find(v => v.id === id);
    }

    deleteSetById(id: number) {
        this.data.splice(this.data.findIndex(v => v.id === id), 1);
    }
}
