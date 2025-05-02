<script lang="ts">
interface ButtonProps {
  children: any;
  onclick?: () => void;
  style?: string;
}

let { children, onclick, style }: ButtonProps = $props();
</script>

<button {onclick} {style}>
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
</style>
