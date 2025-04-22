<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import Modal from "$lib/components/Modal.svelte";
import type { LayoutProps } from "./$types";

let { data }: LayoutProps = $props();

const cards = data.set.cards;

let editMenu: HTMLDialogElement = $state()!;
let addMenu: HTMLDialogElement = $state()!;

let editingCard: number = $state(0);
</script>

<svelte:head>
    <title>mimoli -- {data.set.name}</title>
</svelte:head>

<Modal bind:modal={editMenu} onclose={() => {}} title="Editing card">
    <form action="?/update" method="POST">
        <label>
            front
            <textarea name="front">{editingCard >= 0 ? data.set.cards[editingCard].front : ""}</textarea>
        </label>
        <label>
            back
            <textarea name="back">{editingCard >= 0 ? data.set.cards[editingCard].back : ""}</textarea>
        </label>
        <input type="text" name="card-index" style="display:none;" bind:value={editingCard}>
        <input type="text" name="set-id" style="display:none;" bind:value={data.set.id}>
        <button>save</button>
    </form>
</Modal>
<Modal bind:modal={addMenu} onclose={() => {}} title="Adding card">
    <form action="?/add" method="POST">
        <label>
            front
            <textarea name="front"></textarea>
        </label>
        <label>
            back
            <textarea name="back"></textarea>
        </label>
        <input type="text" name="set-id" style="display:none;" bind:value={data.set.id}>
        <button>save</button>
    </form>
</Modal>
<header>
    <h1>{data.set.name} cards</h1>
</header>
<ul>
    {#each cards as card, i}
        <li>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button onclick={() => {
                editMenu.showModal();
                editingCard = i;
            }}>
                <Icon name="edit" size={32} />
            </button>
        </li>
    {/each}
</ul>
<footer>
    <input type="text" placeholder="search..."/>
    <button onclick={() => addMenu.showModal() }>
        <Icon name="add" size={32} />
    </button>
</footer>

<style>
label {
    display: grid;
    gap: 0.25rem;
}

textarea {
    background-color: var(--clr-neutral-700);
    border: 0;
    padding: 1rem;
}

form button {
    background-color: var(--clr-accent);
    color: var(--clr-bg);
    border: 0;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
}

form {
    display: grid;
    gap: 1rem;
}

header {
    padding-inline: 1.5rem;
}

ul {
    margin: 0;
    padding: 1rem;
    list-style-type: none;
    overflow: scroll;
}

li {
    background-color: var(--clr-surface);
    padding: 1rem;
    border-radius: 1rem;

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
}

li + li {
    margin-top: 1rem;
}

p {
    margin: 0;
    grid-column: 1;
}

p:first-of-type {
    font-weight: 700;
}

li button {
    grid-column: 2;
    grid-row: 1 / 3;
    background-color: inherit;
    color: inherit;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border: 0;
    padding: 0;
    margin-right: 0.25rem;
    cursor: pointer;
}
</style>
