<script lang="ts">
import Icon from "$lib/components/Icon.svelte";
import type { LayoutProps } from "./$types";
import { page } from "$app/state";

let { data, children }: LayoutProps = $props();
</script>

<header>
    {#if page.url.pathname.endsWith("flip")}
        <a href={`/app/${data.set.id}/quiz`}>
            <Icon name="arrow_back" size={32} />
        </a>
    {:else}
        <a href="/app">
            <Icon name="arrow_back" size={32} />
        </a>
    {/if}
    <h1>{data.set.name}</h1>
</header>
{@render children()}
{#if !page.url.pathname.endsWith("flip")}
    <nav>
        <a
            href="/app/{data.set.id}/quiz"
            class:active={page.url.pathname.endsWith("quiz")}
        >
            <Icon name="quiz" />
            <span>quiz</span>
        </a>
        <a
            href="/app/{data.set.id}/cards"
            class:active={page.url.pathname.endsWith("cards")}
        >
            <Icon name="edit_note" />
            <span>cards</span>
        </a>
        <a
            href="/app/{data.set.id}/settings"
            class:active={page.url.pathname.endsWith("settings")}
        >
            <Icon name="settings" />
            <span>settings</span>
        </a>
    </nav>
{/if}

<style>
h1 {
    word-break: break-word;
}

header {
    display: grid;
    grid-template-columns: auto 1fr;
    padding-inline: 1rem;
    align-items: center;
    gap: 1rem;
}

header a {
    text-decoration: none;
    color: inherit;
    display: grid;
    place-items: center;
}

nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: var(--clr-s0);
    overflow: hidden;
    border-radius: 1rem 1rem 0 0;
}

@media (max-width: 640px) {
    nav {
        border-radius: 0;
    }
}

nav a {
    text-decoration: none;
    color: inherit;
    display: grid;
    place-items: center;
    padding: 1.5rem;
}


nav a:hover {
    background-color: var(--clr-s1);
}

nav a.active {
    background-color: var(--clr-s2);
}
</style>
