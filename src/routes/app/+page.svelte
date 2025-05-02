<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import setController from "$lib/data";
import Modal from "$lib/components/Modal.svelte";
import type { LearnSetOverview } from "$lib/types";
import type { PageProps } from "./$types";
import Input from "$lib/components/Input.svelte";
import Button from "$lib/components/Button.svelte";

const { data }: PageProps = $props();
let sets = $state(data.sets);

let setMenu: HTMLDialogElement = $state()!;
let addMenu: HTMLDialogElement = $state()!;
let delButton: HTMLButtonElement;

let setMenuSet: LearnSetOverview = $state({ id: -1, name: "foo" });
let newsetname = $state("");
let errormessage = $state("");
let searchterm = $state("");

async function createset() {
    if (newsetname.trim().length === 0) {
        errormessage = "set name cannot be empty";
        return;
    }
    if (newsetname.trim().length > 20) {
        errormessage = "set name can be at most 20 characters";
        return;
    }
    try {
        await setController.addSet(newsetname.trim());
        sets = await setController.getSetOverviews();
        addMenu.close();
    } catch (e) {
        errormessage = "set with this name already exists";
        return;
    }
}

async function deleteset() {
    await setController.delSet(setMenuSet.id);
    sets = await setController.getSetOverviews();
    setMenu.close();
}
</script>

<svelte:head>
    <title>mimoli -- set list</title>
</svelte:head>

<header>
    <h1>Set list</h1>
</header>
<main>
    <Input
        type="text"
        placeholder="search..."
        bind:value={searchterm}
        style={`width: 100%`} />
    <ul>
        {#each sets.filter(
            (v) => v.name.toLowerCase().includes(searchterm.toLowerCase())
        ) as { id, name }}
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
    onclose={() => {
        newsetname = "";
        errormessage = "";
    }}
    title="New set"
>
    <form onsubmit={createset} class="add-form">
        <label>
            name
            <Input type="text" bind:value={newsetname} --outline={errormessage.length > 0 ? "1px solid var(--clr-error)" : "none"} />
        </label>
        <p>{errormessage}</p>
        <Button>create</Button>
    </form>
</Modal>
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
        <form onsubmit={deleteset}>
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

<style>
h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 1rem;
    font-weight: 400;
    font-size: 1.25rem;
}

ul {
    list-style-type: none;
    margin: 0;
    margin-top: 1rem;
    padding: 0;
    overflow: scroll;
}

li {
    border-radius: 1rem;
    background-color: var(--clr-s0);
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
    background-color: var(--clr-s1);
    color: inherit;
    text-decoration: none;
}

.modal .set-menu-option:hover {
    background-color: var(--clr-s2);
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
    background-color: var(--clr-error);
}

.modal .confirm-delete-button:hover {
    background-color: var(--clr-error);
}

.add-form {
    display: grid;
    gap: 0.5rem;
    text-indent: 0.25rem;
}
.add-form label {
    display: grid;
    gap: 0.5rem;
}
.add-form p {
    margin: 0;
    color: var(--clr-error);
}
</style>
