<script>
	import { onMount } from 'svelte';
	import TextAnimated from './TextAnimated.svelte';

	/**@type {string}*/
	export let words;

	/**@type {boolean}*/
	export let primary = false;

	/**@type {number}*/
	export let delay = 0;

	/**@type {HTMLElement}*/
	let button;

	/**@type {boolean}*/
	export let disabled = false;

	onMount(() => {
		if (primary) button.focus();
	});
</script>

<button bind:this={button} on:click class="btn" class:primary {disabled}>
	<TextAnimated {words} {delay} />
	<slot />
</button>

<style>
	.btn {
		display: flex;
		gap: 0.5em;
		justify-content: center;
		align-items: center;
		padding-block: 0.5em;
		padding-inline: 1em;
		border-radius: 50vh;
		font-weight: bold;
		text-transform: uppercase;
		border: 1px solid var(--color-darkish);
	}

	.btn:hover,
	.btn:focus {
		outline-offset: 3px;
		outline: 1px dashed grey;
		cursor: pointer;
		/* background-color: var(--color-dark); */
	}

	.btn:hover {
		background-color: var(--color-dark);
	}
	.btn:active {
		transform: translateY(5%);
	}

	.primary {
		color: var(--color-light);
		background-color: rgb(101, 215, 158);
		border: 1px solid var(--color-darkish);
		box-shadow: 0px 1px 0px 0px var(--color-lightish), 4px 4px 25px -10px rgb(101, 215, 158);
	}
</style>
