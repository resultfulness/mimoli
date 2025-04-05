import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './delete/$types';
import setController from "$lib/data";

export const actions: Actions = {
    delete: async ({ params }) => {
        if (!Number.isInteger(+params.id)) {
            throw error(422, `set id '${params.id}' not a number`);
        }
        const id = +params.id;

        setController.deleteSetById(id);

        redirect(303, "/app");
    }
};
