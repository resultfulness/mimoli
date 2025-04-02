<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { LearnSetOverview } from "$lib/types";

export let setMenu: HTMLDialogElement;
export let setMenuSet: LearnSetOverview;
</script>

<dialog bind:this={setMenu}>
    <header>
        <h2>{setMenuSet.name} set</h2>
        <button class="close" onclick={() => setMenu.close()}>
            <Icon name="close" size={32} />
        </button>
    </header>
    <div>
        <button>
            <Icon name="search" />
            browse
        </button>
        <button>
            <Icon name="edit" />
            edit
        </button>
        <button>
            <Icon name="delete" />
            delete
        </button>
        <button>
            <Icon name="quiz" />
            test
        </button>
    </div>
</dialog>

<style>

dialog {
    border: 0;
    border-radius: 1rem;
    background-color: var(--clr-surface);
    color: var(--clr-fg);
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    margin-bottom: 1rem;
}

h2 {
    margin: 0;
}

button.close {
    display: grid;
    place-items: center;
    padding: 0;
    background-color: inherit;
    color: inherit;
    border: 0;
    cursor: pointer;
}

div {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
}

div button {
    padding: 1rem;
    cursor: pointer;
    display: grid;
}

</style>
