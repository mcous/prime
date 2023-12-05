<script lang="ts">
import type { Argument as CXArgument } from 'classnames';
import { uniqueId } from '$lib/unique-id';
import {
  Floating,
  type FloatingPlacement,
  type FloatingOffsetOptions,
} from '$lib/floating';

import MenuControl from './menu-control.svelte';
import ContextMenu from './context-menu.svelte';

export let isOpen: boolean;
export let label: string | undefined = undefined;
export let role: string | undefined = undefined;
export let describedBy: string | undefined = undefined;
export let placement: FloatingPlacement = 'bottom-start';
export let offset: FloatingOffsetOptions | undefined = undefined;
export let buttonCX: CXArgument = '';
export let menuCX: CXArgument = '';
export let onChange: (isOpen: boolean) => unknown;

const buttonID = uniqueId('floating-menu-control');
const menuID = uniqueId('floating-menu');
const openMenu = () => onChange(true);
const closeMenu = () => onChange(false);

let referenceElement: HTMLElement | undefined;

const handleClickOutside = (element: Element) => {
  if (!referenceElement?.contains(element)) {
    closeMenu();
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
  }
};
</script>

<svelte:window on:keydown={isOpen ? handleEscape : undefined} />

<MenuControl
  {role}
  {menuID}
  {isOpen}
  {label}
  {describedBy}
  id={buttonID}
  cx={buttonCX}
  on:click={isOpen ? closeMenu : openMenu}
  bind:element={referenceElement}
>
  <slot name="control" />
</MenuControl>

{#if isOpen}
  <Floating
    {offset}
    {placement}
    {referenceElement}
    onClickOutside={handleClickOutside}
  >
    <ContextMenu
      id={menuID}
      labelledBy={buttonID}
      cx={menuCX}
    >
      <slot name="items" />
    </ContextMenu>
  </Floating>
{/if}
