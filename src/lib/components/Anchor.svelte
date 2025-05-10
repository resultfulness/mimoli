<script lang="ts">
interface AnchorProps {
  children: any;
  style?: string;
  href: string;
}

let { children, style, href }: AnchorProps = $props();
</script>

<a {style} {href}>
  {@render children()}
</a>

<style>
a {
  display: grid;
  place-items: center;
  border-radius: 1rem;
  border: 0;
  background-color: var(--clr-main);
  color: var(--clr-bg);
  padding: 0.5rem;
  cursor: pointer;
  text-decoration: none;
}

a:hover {
  background-color: var(--clr-main-hover);
}

a:focus {
  outline: 1px solid var(--clr-main);
  outline-offset: 2px;
}
</style>
