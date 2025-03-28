import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    if (!Number.isInteger(+params.id)) {
        throw error(422, `set id '${params.id}' not a number`);
    }

    return {
        id: params.id,
    };
};
