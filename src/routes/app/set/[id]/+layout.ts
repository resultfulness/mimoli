import type { LayoutLoad } from "./browse/$types";
import setController from "$lib/data";
import { error } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ params }) => {
    if (!Number.isInteger(+params.id)) {
        throw error(422, `set id '${params.id}' not a number`);
    }
    const id = +params.id;

    const set = setController.getSetById(id)
    if (set === undefined) {
        throw error(404, `no set with id ${id}`);
    }

    return { set };
}
