<script lang="ts">
const data = [
    {
        name: "toki pona",
    },
    {
        name: "toki pona",
    },
    {
        name: "toki pona",
    },
    {
        name: "toki pona",
    },
    {
        name: "toki pona",
    },
    {
        name: "toki pona",
    },
];
</script>

<ul>
    {#each data as { name }}
        <li>
            <h2>
                {name}
            </h2>
        </li>
    {/each}
</ul>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 1rem;
    display: grid;
    gap: 1rem;
}

li {
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--clr-neutral-900);
}
</style>
