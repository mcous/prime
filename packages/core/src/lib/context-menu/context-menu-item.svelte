<!--
@component

A clickable item within a context menu that triggers some action.
```svelte
<ContextMenuItem icon="plus" variant="danger" label="click me!" />
```
-->
<svelte:options immutable />

<script lang="ts">
import cx from 'classnames';
import Icon from '$lib/icon/icon.svelte';
import type { IconName } from '$lib/icon/icons';

import { contextMenuItemCx, type ContextMenuItemVariant } from './style';

/**
 * Optional icon name shown in the item.
 */
export let icon: IconName | undefined = undefined;

/** The style variant, default value is 'primary' */
export let variant: ContextMenuItemVariant = 'primary';

/** Additional CSS classes to pass to the item. */
let extraClasses: cx.Argument = '';
export { extraClasses as cx };
</script>

<button
  role="menuitem"
  class={cx(contextMenuItemCx(variant), extraClasses)}
  on:click
>
  {#if icon}
    <Icon
      name={icon}
      cx={{ 'text-gray-6': variant === 'primary' }}
    />
  {/if}

  <slot />
</button>
