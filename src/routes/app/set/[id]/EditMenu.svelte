<script lang="ts">
export let editMenu: HTMLDialogElement;
</script>

<dialog
    bind:this={editMenu}
    onclick={(event) => event.target === editMenu && editMenu.close()}>
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
</style>
