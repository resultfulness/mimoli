import type { LearnCard, LearnSet, LearnSetOverview } from "$lib/types";
import type { SetController } from ".";

export default class SetControllerMock implements SetController {
    // {{{data
    data: Map<number, LearnSet> = new Map([
        [1, {
            id: 1,
            name: "toki pona",
            cards: [
                { front: "mi", back: "i, me, we, us" },
                { front: "sina", back: "you" },
                { front: "ona", back: "he, she, it, they" },
           ],
        }],
        [2, {
            id: 2,
            name: "English Idioms",
            cards: [],
        }],
        [3, {
            id: 3,
            name: "Spanish Verbs",
            cards: [],
        }],
        [4, {
            id: 4,
            name: "Geography Capitals, and Their Populations and Maybe Even Flags",
            cards: [],
        }],
        [5, {
            id: 5,
            name: "History Dates",
            cards: [],
        }],
        [6, {
            id: 6,
            name: "Science Elements",
            cards: [],
        }],
        [7, {
            id: 7,
            name: "Programming Concepts",
            cards: [],
        }],
    ]);
    // }}}
    
    counter: number = 7;

    async addSet(setname: string): Promise<number> {
        return new Promise(res => {
            this.data.set(++this.counter, {
                name: setname,
                cards: [],
                id: this.counter,
            })
            res(this.counter);
        });
    }
    async delSet(id: number): Promise<void> {
        return new Promise((res, rej) => {
            const deleted = this.data.delete(id);
            if (deleted) {
                res();
            } else {
                rej();
            }
        });
    }
    async getSet(id: number): Promise<LearnSet> {
        return new Promise((res, rej) => {
            const set = this.data.get(id);
            if (!set) {
                rej();
            } else {
                res(set);
            }
        });
    }
    async getSetOverviews(): Promise<LearnSetOverview[]> {
        return new Promise((res, rej) => {
            const sets = this.data.values().toArray();
            res(sets.map(({ id, name }) => {
                return { id, name } as LearnSetOverview;
            }));
        });
    }
    async setAddCard(setId: number, front: string, back: string): Promise<void> {
        return new Promise(async (res, rej) => {
            const set = await this.getSet(setId);
            if (!set) {
                rej();
            }
            set.cards.push({ front, back });
            this.data.set(setId, set);
            res();
        });
    }
    async setDelCard(setId: number, cardId: number): Promise<void> {
        return new Promise(async (res, rej) => {
            const set = await this.getSet(setId);
            if (!set) {
                rej();
            }
            set.cards = set.cards.filter((v, i) => i !== cardId);
            this.data.set(setId, set);
            res();
        })
    }
    async setEditCard(setId: number, cardId: number, front: string, back: string): Promise<void> {
        return new Promise(async (res, rej) => {
            const set = await this.getSet(setId);
            if (!set) {
                rej();
            }
            set.cards[cardId] = { front, back };
            this.data.set(setId, set);
            res();
        });
    }
}
