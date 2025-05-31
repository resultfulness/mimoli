<script lang="ts">
import { goto, invalidateAll } from "$app/navigation";
import Button from "$lib/components/Button.svelte";
import FileSaver from "file-saver"
import Input from "$lib/components/Input.svelte";
import setController from "$lib/data";
import type { LayoutProps } from "../$types";

let { data }: LayoutProps = $props();

let setname = $state(data.set.name);
let showConfirm = $state(false);
let errormessage = $state("");

async function renameset() {
    if (setname.trim().length === 0) {
        errormessage = "set name cannot be empty";
        return;
    }
    if (setname.trim().length > 20) {
        errormessage = "set name can be at most 20 characters";
        return;
    }
    try {
        await setController.renameSet(data.set.id, setname.trim());
        window.location.reload();
    } catch (e) {
        errormessage = "set with this name already exists";
    }
}

async function deleteset() {
    setController.delSet(data.set.id);
    await invalidateAll();
    goto("/");
}

async function exportdata() {
    const set = { name: data.set.name, cards: data.set.cards };
    const filename = `mimoli-set-${set.name.replace(" ", "_")}-${new Date().toISOString()}.json`;
    const file = new Blob(
        [JSON.stringify(set, null, 4)],
        { type: "application/json" }
    );
    FileSaver.saveAs(file, filename);
}
</script>

<main>
    <section>
        <h2>Rename set</h2>
        <form onsubmit={renameset}>
            <Input type="text" bind:value={setname} />
            <p class="errormessage">{errormessage}</p>
            <Button disabled={setname.trim() === data.set.name || setname.trim().length === 0}>save</Button>
        </form>
    </section>
    <section>
        <h2>Delete set</h2>
        {#if !showConfirm}
            <Button
                onclick={() => {
                    showConfirm = true;
                }}
            >
                delete set forever
            </Button>
        {:else}
            <Button
                onclick={deleteset}
                style="background-color: var(--clr-error);"
            >
                are you sure?
            </Button>
        {/if}
    </section>
    <section>
        <h2>Export set</h2>
        <Button onclick={exportdata}>
            download set export file
        </Button>
    </section>
</main>

<style>
h2 {
    margin: 0;
}

form {
    display: grid;
}

.errormessage {
    margin: 0.5rem;
    color: var(--clr-error);
}

main {
    padding-inline: 1rem;
}

section {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}
</style>
