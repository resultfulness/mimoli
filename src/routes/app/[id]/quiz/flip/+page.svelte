<script lang="ts">
import Button from "$lib/components/Button.svelte";
import type { LayoutProps } from "../../$types";

let { data }: LayoutProps = $props();
let set = $state(data.set);

let i = $state(0);
let card = $derived(data.set.cards[i]);
let answerHidden = $state(true);

function shownextcard() {
    answerHidden = true;
    i++;
}

function flipcard() {
    answerHidden = !answerHidden;
}
</script>

<main>
    {#if i < data.set.cards.length}
        <p>card {i + 1} out of {data.set.cards.length}</p>
        <button class="card" onclick={flipcard}>
            {#if answerHidden}
                <p>{card.front}</p>
            {:else}
                <p>{card.back}</p>
            {/if}
        </button>
        <Button style="width: 100%; margin-top: 1rem;" onclick={shownextcard}>next</Button>
    {:else}
        <h2>quiz finished</h2>
        <img src="/cat.png" alt="quiz finish reward">
    {/if}
</main>

<style>
main {
    padding: 0 1rem 1rem;
}

h2 {
    font-weight: normal;
    text-align: center;
}

.card {
    border: 0;
    color: var(--clr-fg);
    width: 100%;

    background-color: var(--clr-s0);
    display: grid;
    place-items: center;
    aspect-ratio: 1 / 1;
    border-radius: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
}
</style>
