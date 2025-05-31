<script lang="ts">
import { onMount } from "svelte";
import type { LayoutProps } from "../../$types";

let { data }: LayoutProps = $props();

let i = $state(0);
let card = $derived(data.set.cards[i]);

let answers: string[] = $state([]);
let incorrects: boolean[] = $state([false, false, false, false]);
let mistakes = $state(0);

onMount(() => genanswers());

function genanswers() {
    const correct = card.back;
    const others = data.set.cards
        .filter(c => c.front !== card.front)
        .map(c => c.back)
        .sort(() => 0.5 - Math.random());
    const pulled  = others.slice(0, 3);
    answers = [ correct, ...pulled ];
    answers.sort(() => 0.5 - Math.random());
}

function checkanswer(ansindex: number) {
    if (answers[ansindex] === card.back) {
        incorrects = [false, false, false, false];
        i++;
        if (i < data.set.cards.length) {
            genanswers();
        }
    } else {
        incorrects[ansindex] = true;
        mistakes++;
    }
}

</script>

<main>
    {#if i < data.set.cards.length}
        <h2>{card.front}</h2>
        <div class="answer-grid">
            {#each answers as ans, i}
                <button
                    class="card"
                    onclick={() => checkanswer(i)}
                    class:incorrect={incorrects[i]}
                    disabled={incorrects[i]}
                >
                    {ans}
                </button>
            {/each}
        </div>
    {:else}
        <h2>quiz finished</h2>
        <p>{mistakes} mistakes</p>
        <img src="/cat.gif" alt="quiz finish reward">
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

.card:hover {
    background-color: var(--clr-s1);
}

.answer-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 0.5rem;
}

.incorrect {
    background-color: var(--clr-error) !important;
    color: var(--clr-bg) !important;
}

img {
    display: block;
    margin-inline: auto;
}
</style>
