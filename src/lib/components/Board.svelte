<script>
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';
	import GameAction from './GameAction.svelte';

	/**@type {import('$lib/types').Data}*/
	export let data;

	/**@type {string}*/
	export let currentPlayer;

	/**@type {import('$lib/types').Config}*/
	export let config;

	/**@type {boolean}*/
	export let winner;

	/**@type {number[]}*/
	export let winner_combination;

	/**@type {boolean}*/
	export let equals;

	/**@type {boolean}*/
	export let play;

	/**@type {import('$lib/types').Score}*/
	export let score;

	/**@type {number}*/
	export let sessionCount;

	/**@type {boolean}*/
	let missing = true;

	/**@type {boolean}*/
	let missingState = false;

	const dispatch = createEventDispatcher();

	/**
	 * @param {number} pos
	 */
	function handlerClick(pos) {
		dispatch('action', { pos });

		const posibilities = data.filter(({ active }) => !active).map((ele) => ele.pos);

		if (posibilities.length < 1) return;

		/**@type {HTMLElement | null}*/
		const ref = document.querySelector(`[data-pos="${posibilities[0]}"]`);
		ref?.focus();
	}
</script>

<div class="container">
	<GameAction
		bind:missing
		bind:missingState
		{equals}
		{play}
		{score}
		{winner}
		{sessionCount}
		on:play
		on:restart
		on:session
	/>
	<div class="tablero" id="tablero" class:winner class:tie={equals} class:ready={!play}>
		{#key winner || equals}
			{#each data as square, i (square.pos)}
				{@const transition = winner && winner_combination.includes(square.pos)}
				<Square
					{...square}
					{play}
					{transition}
					{currentPlayer}
					{winner_combination}
					{config}
					{i}
					on:click={() => handlerClick(square.pos)}
				/>
			{/each}
		{/key}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding-block-end: 2em;
	}

	.tablero {
		--size-square-base: 70px;
		--size-text-base: 0.8em;

		font-size: 1.8rem;
		display: grid;
		margin-block: 1rem;
		grid-template-columns: repeat(3, var(--size-square-base));
		grid-template-rows: repeat(3, var(--size-square-base));

		overflow: hidden;
		border-radius: 10px;
		box-shadow: 2px 3px 30px -5px rgba(0 0 0 / 0.1);
		border: 1px solid var(--color-darkish);
		transform: rotate(0);
		background-color: var(--color-darkish);
	}

	.tablero:focus-within {
		outline-offset: 4px;
		outline: 1px dashed rgba(128, 128, 128, 0.3);
	}

	@keyframes jump {
		0% {
			scale: 1;
		}
		50% {
			scale: 1.1;
		}
		100% {
			scale: 1;
		}
	}
	@keyframes wiggle {
		0% {
			transform: rotate(-4deg);
		}
		50% {
			transform: rotate(4deg);
		}
		100% {
			transform: rotate(-4deg);
		}
	}
	.winner {
		border-color: rgb(101, 215, 158);
		scale: 1;
		transition: transform 250ms ease-out;
		transform: rotate(-4deg);
		box-shadow: 2px 3px 30px -5px rgba(57 124 98 / 0.5);
		animation: wiggle 1s 250ms cubic-bezier(0.165, 0.84, 0.44, 1) infinite,
			jump 300ms 1s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.tie {
		border-color: rgba(0, 0, 0, 0.05);
		box-shadow: none;
	}
</style>
