<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import { onMount } from "svelte";
import setController from "$lib/data";
import SetMenu from "./SetMenu.svelte";
import type { LearnSetOverview } from "$lib/types";

const sets = setController.getSetOverviews();

let isDarkMode: boolean = true;

onMount(() => {
    isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";
});

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const updated = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", updated);
    document.documentElement.setAttribute("data-theme", updated)
}

let setMenuSet: LearnSetOverview = { id: -1, name: "foo" };
let setMenu: HTMLDialogElement;
</script>

<svelte:head>
    <title>mimoli -- set list</title>
</svelte:head>

<SetMenu bind:setMenu {setMenuSet} />
<header>
    <h1>Set list</h1>
    <button on:click={toggleTheme}>
        <Icon name={isDarkMode ? "light_mode" : "dark_mode"} size={32} />
    </button>
</header>
<ul>
    {#each sets as { id, name }}
        <li>
            <button on:click={() => {
                setMenuSet = { id, name };
                setMenu.showModal();
            }}>
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

header button {
    display: grid;
    place-items: center;
    text-decoration: none;
    color: inherit;
    padding: .5rem;
    border-radius: 100vw;
    border: 0;
    background-color: inherit;
    cursor: pointer;
}

header button:hover,
header button:focus {
    background-color: var(--clr-surface);
}


ul {
    list-style-type: none;
    margin: 0;
    padding: 1rem;
    display: grid;
    align-items: start;
    gap: 1rem;
    overflow: scroll;
}

li {
    border-radius: 1rem;
    background-color: var(--clr-surface);
    overflow: hidden;
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
</style>
