<script lang="ts">
import type { LayoutProps } from "./$types";

let { data }: LayoutProps = $props();

const cards = data.set.cards;
</script>

<svelte:head>
    <title>mimoli -- test {data.set.name}</title>
</svelte:head>

<ul>
    ...
</ul>
