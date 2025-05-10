<script lang="ts">
import { invalidateAll } from "$app/navigation";
import Button from "$lib/components/Button.svelte";
import Icon from "$lib/components/Icon.svelte";
import Modal from "$lib/components/Modal.svelte";
import Textarea from "$lib/components/Textarea.svelte";
import setController from "$lib/data";
import type { LayoutProps } from "../$types";

let { data }: LayoutProps = $props();
let set = $state(data.set);

let editMenu: HTMLDialogElement = $state()!;
let addMenu: HTMLDialogElement = $state()!;

let cardid = $state(-1);
let delid = $state(-1);
let front = $state("");
let back = $state("");
let searchterm = $state("");

async function addcard() {
    setController.setAddCard(set.id, front.trim(), back.trim());
    set = await setController.getSet(set.id);
    await invalidateAll();
    clearform();
}
async function addcardnclose() {
    await addcard();
    addMenu.close();
}

async function editcard() {
    setController.setEditCard(set.id, cardid, front.trim(), back.trim());
    set = await setController.getSet(set.id);
    await invalidateAll();
    editMenu.close();
}

async function deletecard() {
    setController.setDelCard(set.id, delid);
    set = await setController.getSet(set.id);
    await invalidateAll();
    delid = -1;
}

function clearform() {
    front = "";
    back = "";
}
</script>

<svelte:head>
    <title>mimoli -- {set.name}</title>
</svelte:head>

<main>
    {#if set.cards.length === 0}
        <p class="empty-list-info">no cards!</p>
    {:else}
    <ul>
            {#each set.cards.filter(
                (v) => v.front.toLowerCase().includes(searchterm.toLowerCase()) ||
                    v.back.toLowerCase().includes(searchterm.toLowerCase())
            ) as card, i}
                <li>
                    <button
                        class="edit-button"
                        onclick={() => {
                            cardid = i;
                            delid = -1;
                            front = card.front;
                            back = card.back;
                            editMenu.showModal();
                        }}
                    >
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                    </button>
                    <div>
                        {#if delid === i}
                            <button
                                class="del-button"
                                style="background-color: var(--clr-error);"
                                onclick={() => deletecard()}>
                                <Icon name="question_mark" size={32} />
                            </button>
                        {:else}
                            <button class="del-button" onclick={() => delid = i}>
                                <Icon name="delete" size={32} />
                            </button>
                        {/if}
                    </div>
                </li>
            {/each}
    </ul>
    {/if}
    <Button
        onclick={() => addMenu.showModal()}
        style={`
position: absolute;
bottom: 0;
right: 0;
margin: 1rem;
`}
    >
        <Icon name="add" size={48} />
    </Button>
</main>
<Modal
    bind:modal={addMenu}
    onclose={clearform}
    title="Adding a card"
>
    <form onsubmit={addcardnclose}>
        <Textarea
            bind:value={front}
            required
            labeltext="front"
        ></Textarea>
        <Textarea
            bind:value={back}
            required
            labeltext="back"
        ></Textarea>
        <Button type="button" onclick={addcard}>add</Button>
        <Button>add & close</Button>
    </form>
</Modal>
<Modal
    bind:modal={editMenu}
    onclose={clearform}
    title="Editing a card"
>
    <form onsubmit={editcard}>
        <Textarea
            bind:value={front}
            required
            labeltext="front"
        ></Textarea>
        <Textarea
            bind:value={back}
            required
            labeltext="back"
        ></Textarea>
        <Button>save</Button>
    </form>
</Modal>

<style>
main {
    position: relative;
    padding-inline: 1rem;
}

.empty-list-info {
    text-align: center;
    color: var(--clr-muted);
}

form {
    display: grid;
    text-indent: 0.25rem;
    gap: 1rem;
}

ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    overflow: scroll;
}

li {
    background-color: var(--clr-s0);
    border-radius: 1rem;

    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
}

li + li {
    margin-top: 1rem;
}

li p {
    margin: 0;
}

li p:first-of-type {
    font-weight: 700;
}

li button {
    --_border-radius: 1rem;
    padding: 1rem;
}

li .edit-button {
    border-radius: var(--_border-radius) 0 0 var(--_border-radius);
    text-align: left;
    background-color: inherit;
    border: 0;
    color: inherit;
    cursor: pointer;
}

li .del-button {
    border-radius: 0 var(--_border-radius) var(--_border-radius) 0;
    background-color: inherit;
    color: inherit;
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    border: 0;
    cursor: pointer;
}

li button:hover {
    background-color: var(--clr-s1);
}
</style>
