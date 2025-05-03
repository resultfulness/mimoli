<script lang="ts">
import "../app.css";
</script>

<div id="app">
    <slot />
</div>

<style>
#app {
    position: relative;
    max-width: 640px;
    margin-inline: auto;
    height: 100vh;
    height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;
}
</style>
