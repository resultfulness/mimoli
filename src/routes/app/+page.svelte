<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import setController from "$lib/data";
import Modal from "$lib/components/Modal.svelte";
import type { PageProps } from "./$types";
import Input from "$lib/components/Input.svelte";
import Button from "$lib/components/Button.svelte";
import type { LearnSetImport } from "$lib/types";

const { data }: PageProps = $props();
let sets = $state(data.sets);

let addMenu: HTMLDialogElement = $state()!;

let newsetname = $state("");
let errormessage = $state("");
let searchterm = $state("");

async function createset() {
    if (newsetname.trim().length === 0) {
        newsetname = "";
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

let files: FileList | undefined = $state();

async function importdata() {
    if (!files) { return; }
    const datastring = await files[0].text()

    let data: LearnSetImport;
    try {
        data = JSON.parse(datastring);
    } catch (_) {
        throw new Error("import file not in JSON format");
    }

    if (data.cards.constructor !== Array) {
        throw new Error("invalid import file format");
    }

    if (typeof data.name !== "string") {
        throw new Error("invalid import file format");
    }

    const requiredkeys = ["name", "cards"];
    const datakeys = Object.keys(data);
    for (const key of requiredkeys) {
        if (!datakeys.includes(key)) {
            throw new Error("invalid import file format")
        }
    }

    let id: number;
    try {
        id = await setController.addSet(data.name);
    } catch (e) {
        throw new Error("this set already exists!");
    }
    for (const card of data.cards) {
        await setController.setAddCard(id, card.front, card.back);
    }

    window.location.reload();
}
</script>

<svelte:head>
    <title>mimoli -- set list</title>
</svelte:head>

<header>
    <h1>Set list</h1>
</header>
<main>
    {#if sets.length === 0}
        <p>no sets!</p>
    {:else}
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
                    <a href="/app/{id}/cards">
                        <h2>{name}</h2>
                        <Icon name="chevron_right" size={32} />
                    </a>
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
    <div class="separator">or</div>
    <label class="import-entry">
        import set from file
        <input
            type="file"
            id="import"
            name="import"
            accept="application/json"
            style:display="none"
            onchange={() => {
                importdata().catch(e => alert(e?.toString()))
            }}
            bind:files
        />
    </label>
</Modal>

<style>
.separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin-block: 0.5rem;
    color: var(--clr-muted);
}

.separator::before,
.separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--clr-muted);
}

.separator:not(:empty)::before {
    margin-right: .5em;
}

.separator:not(:empty)::after {
    margin-left: .5em;
}

header, main {
    padding-inline: 1rem;
}

main p {
    text-align: center;
    color: var(--clr-muted);
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

.import-entry {
  display: grid;
  place-items: center;
  border-radius: 1rem;
  border: 0;
  background-color: var(--clr-main);
  color: var(--clr-bg);
  padding: 0.5rem;
  cursor: pointer;
}
.import-entry:hover {
  background-color: var(--clr-main-hover);
}

.import-entry:focus {
  outline: 1px solid var(--clr-main);
  outline-offset: 2px;
}

.import-entry:disabled {
  background-color: var(--clr-muted);
}
</style>
