<script>
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { DIRECTIONS, DIRECTION_POSIBILITIES } from '$lib/constants';

	/**@type {number}*/
	export let pos;

	/**@type {boolean}*/
	export let transition;

	/**@type {boolean}*/
	export let active;

	/**@type {boolean}*/
	export let play;

	/**@type {import('$lib/types').Config}*/
	export let config;

	/**@type {number}*/
	export let i;

	/**@type {number[]}*/
	export let winner_combination;

	/**@type {string}*/
	export let currentPlayer;

	/**@type {string}*/
	export let player = '';

	/**@param {HTMLElement} node */
	function keyboardActions(node) {
		function blur() {
			window.removeEventListener('keydown', handlerKeyDown);
			node.removeEventListener('blur', blur);
		}

		function focus() {
			window.addEventListener('keydown', handlerKeyDown);
			node.addEventListener('blur', blur);
		}
		node.addEventListener('focus', focus);
	}

	/**
	 * @param {number} pos
	 * @param {string} key
	 */
	function getPosNextStep(pos, key) {
		// 7
		if (pos == 7 && key === 'ArrowRight') return 8;
		if (pos == 7 && key === 'ArrowDown') return 4;
		// 8
		if (pos == 8 && key === 'ArrowRight') return 9;
		if (pos == 8 && key === 'ArrowLeft') return 7;
		if (pos == 8 && key === 'ArrowDown') return 5;
		// 9
		if (pos == 9 && key === 'ArrowLeft') return 8;
		if (pos == 9 && key === 'ArrowDown') return 6;
		// 4
		if (pos == 4 && key === 'ArrowRight') return 5;
		if (pos == 4 && key === 'ArrowUp') return 7;
		if (pos == 4 && key === 'ArrowDown') return 1;
		// 5
		if (pos == 5 && key === 'ArrowRight') return 6;
		if (pos == 5 && key === 'ArrowLeft') return 4;
		if (pos == 5 && key === 'ArrowUp') return 8;
		if (pos == 5 && key === 'ArrowDown') return 2;
		// 6
		if (pos == 6 && key === 'ArrowLeft') return 5;
		if (pos == 6 && key === 'ArrowUp') return 9;
		if (pos == 6 && key === 'ArrowDown') return 3;
		// 1
		if (pos == 1 && key === 'ArrowRight') return 2;
		if (pos == 1 && key === 'ArrowUp') return 4;
		// 2
		if (pos == 2 && key === 'ArrowRight') return 3;
		if (pos == 2 && key === 'ArrowLeft') return 1;
		if (pos == 2 && key === 'ArrowUp') return 5;
		// 3
		if (pos == 3 && key === 'ArrowLeft') return 2;
		if (pos == 3 && key === 'ArrowUp') return 6;
	}

	function handlerKeyDown(e) {
		const pos = MatchPosKey(e);
		if (pos) {
			/**@type {HTMLElement | null}*/
			const ref = document.querySelector(`[data-pos="${pos}"]`);
			ref?.focus();
		}

		const direction = MatchDirectionKey(e);
		if (direction && document.activeElement?.dataset?.pos) {
			e.preventDefault();
			const pos = document.activeElement?.dataset?.pos;

			if (DIRECTION_POSIBILITIES[pos].includes(direction)) {
				const nextPos = getPosNextStep(pos, direction);

				/**@type {HTMLElement | null}*/
				const ref = document.querySelector(`[data-pos="${nextPos}"]`);

				ref?.focus();
			}
		}
	}

	function MatchDirectionKey(e) {
		if (DIRECTIONS.includes(e.code)) {
			return e.code;
		}
	}
	function MatchPosKey(e) {
		if (e.code.startsWith('Digit') || e.code.startsWith('Numpad')) return +e.code.slice(-1);
	}
</script>

<button
	title="button-{pos}"
	id="button-{pos}-move"
	in:scale={{
		duration: transition ? 600 : 0,
		easing: quintOut,
		delay: transition ? 50 * i : 0,
		start: 0.9
	}}
	class="square"
	class:active
	class:combination={winner_combination.includes(pos)}
	class:player-a={player === 'a'}
	class:player-b={player === 'b'}
	data-current={config.icons[currentPlayer]}
	data-i={i}
	data-pos={pos}
	disabled={active || !play}
	use:keyboardActions
	on:click>{config.icons[player] ?? ''}</button
>

<style>
	.square.active {
		font-weight: bold;
		font-style: normal;
	}

	.square {
		padding: 0;
		font-weight: lighter;
		font-size: inherit;
		font-family: monospace;
		color: rgba(0, 0, 0, 0.5);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.square:hover:not(:disabled) {
		cursor: pointer;
		opacity: 0.8;
	}

	.square:focus:hover:not(:disabled)::after {
		content: attr(data-current);
		color: rgba(0, 0, 0, 0.5);
	}
	.square:focus:not(:disabled)::after {
		content: attr(data-current);
		color: rgba(0, 0, 0, 0.05);
	}
	.square:hover:not(:disabled)::after {
		content: attr(data-current);
	}

	.square:active:not(:disabled) {
		transform: translateY(3%);
	}

	.square:focus {
		outline-offset: -2px;
		outline: 2px dashed var(--color-lightish);
		opacity: 0.95;
	}

	.square:disabled {
		cursor: not-allowed;
	}

	:global(.winner) > .square {
		color: rgba(0, 0, 0, 0.05);
		background-color: initial;
	}

	:global(.winner) > .combination {
		color: rgb(255, 255, 255);
		background-color: rgb(101, 215, 158);
	}

	:global(.tie) > .square {
		opacity: 0.5;
	}

	.player-a {
		color: var(--co-a);
		background-color: var(--bg-a);
	}

	.player-b {
		color: var(--co-b);
		background-color: var(--bg-b);
	}
</style>
