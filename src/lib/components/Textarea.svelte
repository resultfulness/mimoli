<script lang="ts">
interface InputProps {
  placeholder?: string;
  value: string;
  style?: string;
  required?: boolean;
  labeltext: string;
}

let { placeholder, value = $bindable(), style, required, labeltext }: InputProps = $props();
</script>

<label>
  {labeltext}
  <textarea {placeholder} bind:value {style} {required}></textarea>
</label>

<style>
label {
  display: grid;
  gap: 0.25rem;
}
textarea {
  background-color: var(--clr-s1);
  color: var(--clr-fg);
  border: 0;
  padding: 0.5rem 1rem;
  outline: var(--outline);
  border-radius: 0.5rem;
  resize: none;
}

textarea:focus {
  outline: 1px solid var(--clr-main);
}
</style>
