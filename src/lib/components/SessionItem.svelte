<script>
	import { fly } from 'svelte/transition';

	/**@type {import('$lib/types').Score}*/
	export let score;

	/**@type {number}*/
	export let sessionCount;

	/**@type {string}*/
	export let player;

	/**@param {number} i*/
	function config(i, sessionCount) {
		if (player === 'a')
			return {
				active: score[player][i],
				delay: 100 * i,
				label: i + 1
			};

		return {
			active: score[player][sessionCount - 1 - i],
			delay: 100 * sessionCount - 100 * i,
			label: sessionCount - i
		};
	}
</script>

{#key score[player].length}
	{#each Array(sessionCount) as _, i}
		{@const { active, delay, label } = config(i, sessionCount)}
		<span in:fly={{ y: '50%', delay }} class="session-item {active ? player : ''}">
			{label}
		</span>
	{/each}
{/key}

<style>
	.session-item {
		font-family: var(--font-mono);
		background-color: white;
		display: inline-block;
		border: none;
		border-radius: 50vh;
		padding-inline: 0.3em;
		opacity: 0.1;
		border: 1px solid rgb(0, 0, 0);
	}
	.session-item.a {
		border-color: transparent;
		background-color: var(--bg-a);
		opacity: 1;
		color: white;
	}

	.session-item.b {
		border-color: transparent;
		background-color: var(--bg-b);
		opacity: 1;
		color: white;
	}
</style>
