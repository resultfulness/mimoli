<script lang="ts">
import { goto } from "$app/navigation";
import Button from "$lib/components/Button.svelte";
import Input from "$lib/components/Input.svelte";
import setController from "$lib/data";
import type { LayoutProps } from "../$types";

let { data }: LayoutProps = $props();

let setname = $state(data.set.name);
let showConfirm = $state(false);
</script>

<main>
    <h2>Rename set</h2>
    <section>
        <form action="">
            <Input type="text" bind:value={setname} />
            <Button>save</Button>
        </form>
    </section>
    <h2>Delete set</h2>
    <section>
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
}
</style>
