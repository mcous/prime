<script lang="ts">
import cx from 'classnames';

export let id: string;
export let menuID: string;
export let isOpen: boolean;
export let popup: 'menu' | 'dialog' = 'menu';
export let role: string | undefined = undefined;
export let label: string | undefined = undefined;
export let describedBy: string | undefined = undefined;
export let element: HTMLElement | undefined = undefined;
export { extraCX as cx };

let extraCX: cx.Argument;
</script>

<button
  {role}
  {id}
  class={cx(extraCX)}
  aria-haspopup={popup}
  aria-controls={menuID}
  aria-expanded={isOpen}
  aria-label={label}
  aria-describedby={describedBy}
  bind:this={element}
  on:click
>
  <slot />
</button>
