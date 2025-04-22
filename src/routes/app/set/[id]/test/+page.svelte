<script lang="ts">
import type { LearnCard } from "$lib/types";
import type { LayoutProps } from "./$types";

let { data }: LayoutProps = $props();

const cards = data.set.cards;

let currentCardId: number = $state(0);
let currentCard: LearnCard = $derived(cards.at(currentCardId));
let answerShown: boolean = $state(false);
</script>

<svelte:head>
    <title>mimoli -- test {data.set.name}</title>
</svelte:head>

<div>
    <span class="front" style:display={answerShown ? "none" : "inline"}>
        {currentCard.front}
    </span>
    <span class="back" style:display={!answerShown ? "none" : "inline"}>
        {currentCard.back}
    </span>
</div>

<footer>
    <button onclick={() => answerShown = !answerShown }>
        show {answerShown ? "front" : "back"}
    </button>
    {#if currentCardId < cards.length - 1}
        <button onclick={() => { currentCardId++; }}>next</button>
    {:else}
        <a href="/">finish</a>
    {/if}
</footer>
