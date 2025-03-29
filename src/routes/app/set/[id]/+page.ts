import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import dataProvider from "$lib/data";

export const load: PageLoad = ({ params }) => {
    if (!Number.isInteger(+params.id)) {
        throw error(422, `set id '${params.id}' not a number`);
    }
    const id = +params.id;

    const set = dataProvider.getSetById(id)
    if (set === undefined) {
        throw error(404, `no set with id ${id}`);
    }

    return {
        id,
        set
    };
};
