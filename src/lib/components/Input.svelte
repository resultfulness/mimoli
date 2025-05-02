<script lang="ts">
interface InputProps {
  type: string;
  placeholder?: string;
  value: string;
  style?: string;
  required?: boolean;
}

let { type, placeholder, value = $bindable(), style, required }: InputProps = $props();
</script>

<input {type} {placeholder} bind:value {style} {required} />

<style>
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
</style>
