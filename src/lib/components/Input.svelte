<script lang="ts">
interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  style?: string;
  required?: boolean;
  labeltext?: string;
}

let { type, placeholder, value = $bindable(), style, required, labeltext }: InputProps = $props();
</script>

{#if labeltext}
  <label>
    {labeltext}
    <input {type} {placeholder} bind:value {style} {required} />
  </label>
{:else}
  <input {type} {placeholder} bind:value {style} {required} />
{/if}

<style>
label {
    display: grid;
    gap: 0.25rem;
}

input {
  background-color: var(--clr-s1);
  color: var(--clr-fg);
  border: 0;
  padding: 0.5rem 1rem;
  outline: var(--outline);
  border-radius: 0.5rem;
}

input:focus {
  outline: 1px solid var(--clr-main);
}

input::placeholder {
  color: var(--clr-muted);
}
</style>
