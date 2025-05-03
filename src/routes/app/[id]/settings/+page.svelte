<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$lib/components/Button.svelte";
import Input from "$lib/components/Input.svelte";
import setController from "$lib/data";
import type { LayoutProps } from "../$types";

let { data }: LayoutProps = $props();

let setname = $state(data.set.name);
let showConfirm = $state(false);

async function renameset() {
    await setController.renameSet(data.set.id, setname);
    window.location.reload();
}
</script>

<main>
    <section>
        <h2>Rename set</h2>
        <form onsubmit={renameset}>
            <Input type="text" bind:value={setname} />
            <Button>save</Button>
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
                onclick={() => {
                    setController.delSet(data.set.id);
                    goto("/");
                }}
                style="background-color: var(--clr-error);"
            >
                are you sure?
            </Button>
        {/if}
    </section>
</main>

<style>
h2 {
    margin: 0;
}

form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
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
