<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { LearnSetOverview } from "$lib/types";

export let setMenu: HTMLDialogElement;
export let setMenuSet: LearnSetOverview;

let delButton: HTMLButtonElement;
</script>

<dialog
    bind:this={setMenu}
    onclose={() => { delButton.style.display = "none" }}
    onclick={(event) => event.target === setMenu && setMenu.close()}>
    <header>
        <h2>{setMenuSet.name}</h2>
        <button class="close" onclick={() => setMenu.close()}>
            <Icon name="close" size={32} />
        </button>
    </header>
    <div>
        <a href="/app/set/{setMenuSet.id}/test" class="set-menu-option">
            <Icon name="quiz" />
            test
        </a>
        <form action="/app/set/{setMenuSet.id}?/delete" method="POST">
            <button
                type="button"
                onclick={() => delButton.style.display="grid" }
                class="set-menu-option">
                <Icon name="delete" />
                delete
            </button>
            <button class="set-menu-option confirm-delete-button" bind:this={delButton}>
                <Icon name="question_mark" />
                confirm
            </button>
        </form>
        <a href="/app/set/{setMenuSet.id}" class="set-menu-option">
            <Icon name="edit" />
            edit
        </a>
    </div>
</dialog>

<style>

dialog {
    border: 0;
    border-radius: 1rem;
    background-color: var(--clr-surface);
    color: var(--clr-fg);
    width: min(100% - 4rem, 320px);
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
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
    gap: 0.2rem;
    border-radius: 1rem;
    overflow: hidden;
}

.set-menu-option:first-of-type {
    grid-column: span 2;
}

.set-menu-option {
    padding: 1rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    border: 0;
    background-color: var(--clr-accent-darker);
    color: inherit;
    text-decoration: none;
}

.set-menu-option:hover {
    background-color: var(--clr-accent-dark);
}

form {
    position: relative;
}

form button {
    position: absolute;
    inset: 0;
}

.confirm-delete-button {
    display: none;
    background-color: var(--clr-alert);
}

.confirm-delete-button:hover {
    background-color: var(--clr-alert);
}
</style>
