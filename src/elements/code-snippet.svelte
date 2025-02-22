<svelte:options immutable tag="v-code-snippet" />

<script context="module" lang="ts">
const loadedLanguages: Record<string, boolean> = {};
</script>

<script lang="ts">
import { addStyles } from '../lib';
import pkg from '../../package.json';

import { dispatcher } from '../lib/dispatch';

export let language: string;
export let code: string;
export let theme: 'vs' | 'vsc-dark-plus' = 'vs';
export let showbutton = 'true';

const dispatch = dispatcher();

let element: HTMLElement;

addStyles();

const version = pkg.devDependencies.prismjs.replace('^', '');

const cdn = (src: string) =>
  `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}/${src}`;

const script = (src: string) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    document.head.append(script);
  });

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(code);
    dispatch('copy', { value: 'Successfully copied snippet to the clipboard' });
  } catch {
    dispatch('copy', { value: ':( Failed to copy snippet to the clipboard' });
  }
};

const highlight = async (element: Element) => {
  const { Prism } = window as { Prism: typeof import('prismjs') };

  if (!Prism) {
    await script(cdn('prism.min.js'));
  }

  if (!loadedLanguages[language]) {
    await script(cdn(`components/prism-${language}.min.js`));
    // eslint-disable-next-line require-atomic-updates
    loadedLanguages[language] = true;
  }

  if (element !== undefined) {
    window.Prism.highlightElement(element);
  }
};

$: void highlight(element);
</script>

<pre
  class="relative !border-none !m-0 !pr-24 !pb-0
    {theme === 'vsc-dark-plus' ? '!bg-gray-9' : '!bg-light'} "><code
    bind:this={element}
    class="language-{language} font-mono">{code}</code
  >
  {#if showbutton === 'true'}
    <v-button
      class="absolute top-2 right-2 !text-black !font-sans"
      on:click={copyToClipboard}
      on:keyup={copyToClipboard}
      label="Copy"
      icon="copy"
    />
  {/if}
</pre>

<link
  rel="stylesheet"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
  href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-{theme}.min.css"
/>
