import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import setController from "$lib/data";

export const actions: Actions = {
    delete: async ({ params }) => {
        if (!Number.isInteger(+params.id)) {
            throw error(422, `set id '${params.id}' not a number`);
        }
        const id = +params.id;

        await setController.delSet(id);

        redirect(303, "/");
    },
    update: async ({ request }) => {
        const formData = await request.formData();
        const f = formData.get("front");
        const b = formData.get("back");
        const cardIndex = formData.get("card-index");
        const setId = formData.get("set-id");

        if (f === null || b === null || cardIndex === null || setId === null) {
            throw error(400);
        }

        await setController.setEditCard(
            +setId,
            +cardIndex.toString(),
            {
                front: f.toString(),
                back: b.toString()
            }
        );

        redirect(303, `/app/set/${setId}`);
    },
    add: async ({ request }) => {
        const formData = await request.formData();
        const f = formData.get("front");
        const b = formData.get("back");
        const setId = formData.get("set-id");

        if (f === null || b === null || setId === null) {
            throw error(400);
        }

        await setController.setAddCard(
            +setId,
            { front: f.toString(), back: b.toString() }
        );

        redirect(303, `/app/set/${setId}`);
    }
};
