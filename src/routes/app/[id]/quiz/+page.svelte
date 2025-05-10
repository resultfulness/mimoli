<script lang="ts">
import type { LayoutProps } from "../$types";

let { data }: LayoutProps = $props();
let set = $state(data.set);
</script>

<main>
    {#if data.set.cards.length === 0}
        <p>
            no cards yet!
            <br>
            open the cards tab to get started
        </p>
    {:else}
        <ul>
            <li>
                <h2>
                    <a href={`/app/${set.id}/quiz/flip`}>fliptest</a>
                </h2>
            </li>
        </ul>
    {/if}
</main>

<style>
main {
    padding-inline: 1rem;
}

main p {
    color: var(--clr-muted);
    text-align: center;
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
    padding: 0;
    margin: 0;
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
</style>
