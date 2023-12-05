<script lang="ts">
import cx from 'classnames';
import { clickOutside } from '$lib/click-outside';
import {
  floatingStyle,
  type FloatingReferenceElement,
  type FloatingPlacement,
  type FloatingOffsetOptions,
  type FloatingShiftOptions,
} from './floating-style';

export { className as cx };
export let referenceElement: FloatingReferenceElement | undefined;
export let placement: FloatingPlacement = 'bottom-start';
export let offset: FloatingOffsetOptions | undefined = undefined;
export let shift: FloatingShiftOptions | undefined = undefined;
export let onClickOutside: ((target: Element) => unknown) | undefined =
  undefined;

const style = floatingStyle();
let floatingElement: HTMLElement | undefined;
let className: cx.Argument = undefined;

$: style.register({
  referenceElement,
  floatingElement,
  placement,
  offset,
  shift,
});
</script>

<div
  bind:this={floatingElement}
  class={cx('absolute left-0 top-0 z-max w-max', className)}
  class:invisible={!$style}
  style:top={$style?.top}
  style:left={$style?.left}
  use:clickOutside={onClickOutside}
>
  <slot />
</div>
