<script lang="ts">
interface ButtonProps {
  children: any;
  onclick?: () => void;
  style?: string;
  type?: "button" | "submit" | "reset" | null | undefined;
  disabled?: boolean;
}

let { children, onclick, style, type, disabled }: ButtonProps = $props();
</script>

<button {onclick} {style} {type} {disabled}>
  {@render children()}
</button>

<style>
button {
  display: grid;
  place-items: center;
  border-radius: 1rem;
  border: 0;
  background-color: var(--clr-main);
  color: var(--clr-bg);
  padding: 0.5rem;
  cursor: pointer;
}

button:hover {
  background-color: var(--clr-main-hover);
}

button:focus {
  outline: 1px solid var(--clr-main);
  outline-offset: 2px;
}

button:disabled {
  background-color: var(--clr-muted);
}
</style>
