<script lang="ts">
    import type { PageProps } from "./$types";

    let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>mimoli -- {data.set.name}</title>
</svelte:head>

{data.set.id}
