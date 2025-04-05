<script lang="ts">
    import type { LayoutProps } from "./$types";

    let { data }: LayoutProps = $props();

    const cards = data.set.cards;
</script>

<svelte:head>
    <title>mimoli -- editing {data.set.name}</title>
</svelte:head>

<ul>
    ...
</ul>
