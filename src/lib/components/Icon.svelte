<script lang="ts">
  export let name: string;
  export let size: number = 24;
  export let outlined: boolean = false;
  export let dark: boolean = false;
  export let color: string = "inherit";
</script>

<span
  class:dark
  class:light={!dark}
  class="material-icons{outlined ? "-outlined" : ""}"
  style:font-size={size + "px"}
  style:color
>
  {name}
</span>

<style>
  .dark {
    color: var(--clr-bg);
  }
  .light {
    color: var(--clr-fg);
  }
</style>

