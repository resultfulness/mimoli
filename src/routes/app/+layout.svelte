<script lang="ts">
    import NavigationBar from "./NavigationBar.svelte";
</script>

<main>
    <div><slot /></div>

    <NavigationBar />
</main>

<style>
main {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100vh;
}

div {
    overflow: scroll;
}
</style>
