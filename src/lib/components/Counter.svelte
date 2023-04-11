<script>
	import SessionItem from './SessionItem.svelte';

	// import { createEventDispatcher } from 'svelte';
	// import { fly } from 'svelte/transition';

	/**@type {string}*/
	export let currentPlayer;

	/**@type {boolean}*/
	export let winner;

	/**@type {boolean}*/
	export let equals;

	/**@type {import('$lib/types').Score}*/
	export let score;

	/**@type {boolean}*/
	export let play;

	/**@type {string}*/
	export let nameA;

	/**@type {string}*/
	export let nameB;

	/**@type {number}*/
	export let sessionCount;
</script>

<div class="session">
	<div class="session-group">
		<SessionItem {sessionCount} {score} player="a" />
	</div>
	<div class="session-group">
		{#if winner || equals}
			{#if winner}
				<input
					class:a={currentPlayer === 'a'}
					class:b={currentPlayer === 'b'}
					class="current"
					type="text"
					value="winner: {currentPlayer === 'a' ? nameA : nameB}"
					disabled
				/>
			{/if}
			{#if equals}
				<input type="text" value="tie" disabled />
			{/if}
		{:else}
			<input
				class:current={currentPlayer === 'a'}
				class="a"
				type="text"
				bind:value={nameA}
				disabled={play}
			/>
			<input
				class:current={currentPlayer === 'b'}
				class="b"
				type="text"
				bind:value={nameB}
				disabled={play}
			/>
		{/if}
	</div>
	<div class="session-group">
		<SessionItem {sessionCount} {score} player="b" />
	</div>
</div>

<style>
	.session {
		padding: 1em;

		text-align: center;
	}

	.session-group {
		max-width: 300px;
		display: flex;
		justify-content: space-around;
		margin-inline: auto;
		padding-block: 0.5em;
	}

	input {
		border: 1px solid transparent;
		outline: none;
		font-weight: bold;
		min-width: 0;
		text-align: center;
		border-radius: 50vh;
		background-color: rgba(128, 128, 128, 0.1);
		margin-inline: 0.25em;
	}

	input:focus {
		/* border-color: grey; */
		outline-offset: 3px;
		outline: 1px dashed grey;
	}

	input.a {
		color: var(--co-a);
	}
	input.b {
		color: var(--co-b);
	}
	input.a.current {
		color: white;
		background-color: var(--bg-a);
	}
	input.b.current {
		color: initial;
		background-color: var(--bg-b);
	}
</style>
