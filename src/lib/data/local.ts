import type { LearnCard, LearnSet, LearnSetOverview } from "$lib/types";
import type { SetController } from ".";

export default class SetControllerLocal implements SetController {
    private db: IDBDatabase | undefined;

    private async getdb() {
        if (this.db === undefined) {
            this.db = await this.opendb();
        }
        return this.db;
    }

    private async opendb(): Promise<IDBDatabase> {
        return new Promise((res, rej) => {
            const request = window.indexedDB.open("mimoli", 2);

            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                res(e.target?.result);
            }
            request.onupgradeneeded = (e) => {
                const db: IDBDatabase = e.target?.result;
                const store = db.createObjectStore(
                    "learnsets",
                    { autoIncrement: true, keyPath: "id" }
                );
                store.createIndex("name", "name", { unique: true });
            }
        });
    }

    async addSet(setname: string): Promise<number> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const request = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets")
                .add({ name: setname, cards: [] });

            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                console.log(e.target?.result);
                res(e.target?.result);
            }
        });
    }
    async delSet(id: number): Promise<void> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const request = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets")
                .delete(id);

            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => res();
        })
    }
    async getSet(id: number): Promise<LearnSet> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const request = db.transaction("learnsets")
                .objectStore("learnsets")
                .get(id);

            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                res(e.target?.result);
            }
        })
    }

    async renameSet(id: number, setname: string): Promise<void> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const store = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets");
            const request = store.get(id);
            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                const set: LearnSet = e.target?.result;

                set.name = setname;

                const updateRequest = store.put(set);
                updateRequest.onerror = (e) => rej(e);
                updateRequest.onsuccess = (e) => res();
            }
        });
    }

    async getSetOverviews(): Promise<LearnSetOverview[]> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const request = db.transaction("learnsets")
                .objectStore("learnsets")
                .getAll();

            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                const sets: LearnSet[] = e.target?.result;
                const setOverviews: LearnSetOverview[] = sets.map(v => {
                    return {
                        name: v.name,
                        id: v.id,
                    };
                })
                res(setOverviews);
            }
        });
    }
    async setAddCard(setId: number, front: string, back: string): Promise<void> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const store = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets");
            const request = store.get(setId);
            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                const set: LearnSet = e.target?.result;

                const cards = [ ...set.cards, { front, back } ];
                set.cards = cards;

                const updateRequest = store.put(set);
                updateRequest.onerror = (e) => rej(e);
                updateRequest.onsuccess = (e) => res();
            }
        });
    }
    async setDelCard(setId: number, cardId: number): Promise<void> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const store = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets");
            const request = store.get(setId);
            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                const set: LearnSet = e.target?.result;

                const cards = set.cards.filter((v, i) => i !== cardId);
                set.cards = cards;

                const updateRequest = store.put(set);
                updateRequest.onerror = (e) => rej(e);
                updateRequest.onsuccess = (e) => res();
            }
        });
    }
    async setEditCard(setId: number, cardId: number, front: string, back: string): Promise<void> {
        const db = await this.getdb();
        return new Promise((res, rej) => {
            const store = db.transaction("learnsets", "readwrite")
                .objectStore("learnsets");
            const request = store.get(setId);
            request.onerror = (e) => rej(e);
            request.onsuccess = (e) => {
                const set: LearnSet = e.target?.result;

                const cards = set.cards;
                cards[cardId] = { front, back };
                set.cards = cards;

                const updateRequest = store.put(set);
                updateRequest.onerror = (e) => rej(e);
                updateRequest.onsuccess = (e) => res();
            }
        });
    }

}
