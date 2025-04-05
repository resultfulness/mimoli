<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { LayoutProps } from "./$types";

let { data }: LayoutProps = $props();

const cards = data.set.cards;
</script>

<svelte:head>
    <title>mimoli -- {data.set.name}</title>
</svelte:head>

<header>
    <h1>{data.set.name} cards</h1>
</header>
<ul>
    {#each cards as card}
        <li>
            <p>{card.front}</p>
            <p>{card.back}</p>
            <button onclick={() => {}}>
                <Icon name="edit" size={32} />
            </button>
        </li>
    {/each}
</ul>

<style>

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
    aspect-ratio: 1 / 1;
    display: grid;
    place-items: center;
    border: 0;
    padding: 0;
    margin-right: 0.25rem;
    cursor: pointer;
}
</style>
