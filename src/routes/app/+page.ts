import setController from "$lib/data";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const sets = await setController.getSetOverviews();
    return { sets };
}
