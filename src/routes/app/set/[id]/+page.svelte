<script lang="ts">
    import type { LayoutProps } from "./$types";

    let { data }: LayoutProps = $props();
</script>

<svelte:head>
    <title>mimoli -- {data.set.name}</title>
</svelte:head>
