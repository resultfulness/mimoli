<script>
    import Icon from "$lib/components/Icon.svelte";
    import { page } from "$app/state";

    const current_pathname = $derived(page.url.pathname);

    const routes = [
        {
            pathname: "/app",
            title: "App",
            icon_name: "favorite",
        },
        {
            pathname: "/app/settings",
            title: "Settings",
            icon_name: "settings",
        },
    ];
</script>

<nav>
    <ul>
        {#each routes as { pathname, title, icon_name }}
            <li>
                <a
                    href={pathname}
                    {title}
                    class:active={pathname === current_pathname}
                >
                    <Icon
                        name={icon_name === "favorite" &&
                        pathname !== current_pathname
                            ? icon_name + "_border"
                            : icon_name}
                        outlined={pathname !== current_pathname}
                        size={30}
                    />
                    <span>{title}</span>
                </a>
            </li>
        {/each}
    </ul>
</nav>

<style>
    nav {
        max-width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        background-color: var(--clr-accent-dark);
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 1rem 0 1rem;
        border-radius: 1rem;
        margin-inline: auto;
        max-width: 640px;
        display: flex;
        justify-content: center;
        gap: 1rem;
        position: relative;
    }

    li {
        flex-basis: 100%;
        max-width: 128px;
    }

    a {
        text-decoration: none;
        color: inherit;
        display: grid;
        place-items: center;
        border-radius: 100vw;
        padding: 0.5rem 0 0.5rem;
    }

    a.active {
        background-color: var(--clr-accent-darker);
    }
</style>
