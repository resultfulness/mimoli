import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import setController from "$lib/data";

export const actions: Actions = {
    delete: async ({ params }) => {
        if (!Number.isInteger(+params.id)) {
            throw error(422, `set id '${params.id}' not a number`);
        }
        const id = +params.id;

        setController.deleteSetById(id);

        redirect(303, "/");
    },
    update: async ({ url, request }) => {
        const formData = await request.formData();
        const f = formData.get("front");
        const b = formData.get("back");
        const cardIndex = formData.get("card-index");

        if (f === null || b === null || cardIndex === null) {
            throw error(400);
        }

        setController.updateSetCardByIdByIndex(
            +url.pathname.split("/").at(-1)!,
            +cardIndex.toString(),
            {
                front: f.toString(),
                back: b.toString()
            }
        )
    }
};
