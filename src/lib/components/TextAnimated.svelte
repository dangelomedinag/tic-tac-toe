<script>
	import { fly } from 'svelte/transition';

	export let words = '';
	export let delay = 0;
</script>

<div class="wrapper-words">
	{#each words as letter, i}
		{@const delayed = delay > 0 ? 100 * i + delay : 100 * i}
		<span in:fly={{ y: '-10%', delay: delayed }}>{letter}</span>
	{/each}
</div>

<style>
	.wrapper-words {
		display: inline-block;
	}
</style>
