<script lang="ts">
    import Icon from "$lib/components/Icon.svelte";
    import { onMount } from "svelte";

    let isDarkMode: boolean = true;

    onMount(() => {
        isDarkMode =
            document.documentElement.getAttribute("data-theme") === "dark";
    });

    function toggleTheme() {
        isDarkMode = !isDarkMode;
        const updated = isDarkMode ? "dark" : "light";
        localStorage.setItem("theme", updated);
        document.documentElement.setAttribute("data-theme", updated);
    }
</script>

<button onclick={toggleTheme}>
    <Icon name={isDarkMode ? "light_mode" : "dark_mode"} size={32} />
</button>

<style>
    button {
        display: grid;
        place-items: center;
        text-decoration: none;
        color: inherit;
        padding: 0.5rem;
        border-radius: 100vw;
        border: 0;
        background-color: inherit;
        cursor: pointer;
    }

    button:hover,
    button:focus {
        background-color: var(--clr-surface);
    }
</style>
