<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import setController from "$lib/data";
import ThemeSwitchButton from "./ThemeSwitchButton.svelte";
import Modal from "$lib/components/Modal.svelte";
import type { LearnSetOverview } from "$lib/types";
import type { PageProps } from "./$types";

const { data }: PageProps = $props();
const sets = data.sets;

let setMenuSet: LearnSetOverview = $state({ id: -1, name: "foo" });
let setMenu: HTMLDialogElement = $state()!;
let delButton: HTMLButtonElement;
</script>

<svelte:head>
    <title>mimoli -- set list</title>
</svelte:head>

<Modal
    bind:modal={setMenu}
    onclose={() => (delButton.style.display = "none")}
    title={setMenuSet.name}
>
    <div class="modal">
        <a href="/app/set/{setMenuSet.id}/test" class="set-menu-option">
            <Icon name="quiz" />
            test
        </a>
        <form action="/app/set/{setMenuSet.id}?/delete" method="POST">
            <button
                type="button"
                onclick={() => (delButton.style.display = "grid")}
                class="set-menu-option"
            >
                <Icon name="delete" />
                delete
            </button>
            <button
                class="set-menu-option confirm-delete-button"
                bind:this={delButton}
            >
                <Icon name="question_mark" />
                confirm
            </button>
        </form>
        <a href="/app/set/{setMenuSet.id}" class="set-menu-option">
            <Icon name="edit" />
            edit
        </a>
    </div>
</Modal>
<header>
    <h1>Set list</h1>
    <ThemeSwitchButton />
</header>
<ul>
    {#each sets as { id, name }}
        <li>
            <button
                onclick={() => {
                    setMenuSet = { id, name };
                    setMenu.showModal();
                }}
            >
                <h2>
                    {name}
                </h2>
                <Icon name="chevron_right" size={32} />
            </button>
        </li>
    {/each}
</ul>

<style>
header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding-inline: 1.5rem;
}

h2 {
    margin-left: 1rem;
    font-weight: 400;
    font-size: 1.25rem;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 1rem;
    overflow: scroll;
}

li {
    border-radius: 1rem;
    background-color: var(--clr-surface);
    overflow: hidden;
}

li + li {
    margin-top: 1rem;
}

li button {
    padding: 0.25rem 1rem;
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    background-color: inherit;
    border: 0;
    text-align: left;
    cursor: pointer;
}

.modal {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.2rem;
    border-radius: 1rem;
    overflow: hidden;
}

.modal .set-menu-option:first-of-type {
    grid-column: span 2;
}

.modal .set-menu-option {
    padding: 1rem;
    cursor: pointer;
    display: grid;
    place-items: center;
    border: 0;
    background-color: var(--clr-accent-darker);
    color: inherit;
    text-decoration: none;
}

.modal .set-menu-option:hover {
    background-color: var(--clr-accent-dark);
}

.modal form {
    position: relative;
}

.modal form button {
    position: absolute;
    inset: 0;
}

.modal .confirm-delete-button {
    display: none;
    background-color: var(--clr-alert);
}

.modal .confirm-delete-button:hover {
    background-color: var(--clr-alert);
}
</style>
