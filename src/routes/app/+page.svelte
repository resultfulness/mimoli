<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import setController from "$lib/data";
import Modal from "$lib/components/Modal.svelte";
import type { PageProps } from "./$types";
import Input from "$lib/components/Input.svelte";
import Button from "$lib/components/Button.svelte";

const { data }: PageProps = $props();
let sets = $state(data.sets);

let addMenu: HTMLDialogElement = $state()!;

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
                <a href="/app/{id}/quiz">
                    <h2>{name}</h2>
                    <Icon name="chevron_right" size={32} />
                </a>
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
        <Input
            labeltext="name"
            type="text"
            bind:value={newsetname}
            --outline={errormessage.length > 0 ? "1px solid var(--clr-error)" : "none"} />
        <p>{errormessage}</p>
        <Button>create</Button>
    </form>
</Modal>

<style>
header, main {
    padding-inline: 1rem;
}

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

li a {
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

.add-form {
    display: grid;
    gap: 0.5rem;
    text-indent: 0.25rem;
}
.add-form p {
    margin: 0;
    color: var(--clr-error);
}
</style>
