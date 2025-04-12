<script lang="ts">
    import type { Snippet } from "svelte";
    import Icon from "./Icon.svelte";

interface ModalProps {
    modal: HTMLDialogElement,
    onclose: () => void,
    children: Snippet,
        title: string,
};

let {
    modal = $bindable(),
    onclose = () => {},
    children,
        title,
}: ModalProps = $props();
</script>

<dialog
    bind:this={modal}
    {onclose}
    onclick={(event) => event.target === modal && modal.close()}
>
    <header>
        <h2>{title}</h2>
        <button class="close" onclick={() => modal.close()}>
            <Icon name="close" size={32} />
        </button>
    </header>
    {@render children()}
</dialog>

<style>
dialog {
    border: 0;
    border-radius: 1rem;
    background-color: var(--clr-surface);
    color: var(--clr-fg);
    width: min(100% - 4rem, 320px);
}

dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    margin-bottom: 1rem;
}

h2 {
    margin: 0;
}

button.close {
    display: grid;
    place-items: center;
    padding: 0;
    background-color: inherit;
    color: inherit;
    border: 0;
    cursor: pointer;
}
</style>
