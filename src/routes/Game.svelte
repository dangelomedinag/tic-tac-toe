<script>
	import JSConfetti from 'js-confetti';
	import { onMount, tick } from 'svelte';
	import Counter from '$lib/components/Counter.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import Board from '$lib/components/Board.svelte';
	import { LINES, COLOR_PLAYERS, ICON_PLAYERS, MAPPED_PAD } from '$lib/constants';
	import Shortcuts from '$lib/components/Shortcuts.svelte';

	/**@type {JSConfetti}*/
	let jsConfetti;

	onMount(() => {
		jsConfetti = new JSConfetti();
	});

	/**@type {string} */
	let nameA = 'player A';

	/**@type {string} */
	let nameB = 'player B';

	/**@type {number} count of game sessions */
	let sessionCount = 5;

	/**@type {number} count of games */
	let count = 0;

	/**@type {boolean} play - if true when game is active.*/
	let play = false;

	/**@type {import('$lib/types').Score} score - counts wins if both player*/
	let score = { a: [], b: [] };

	/**@type {boolean} winner - if true when existe a winner.*/
	let winner = false;

	/**@type {number[]} winner_combination - position of squares .*/
	let winner_combination = [];

	/**@type {boolean} equals - indicate if game is tie.*/
	let equals = false;

	/**@type {import('$lib/types').Data} data - array contains data of current session game.*/
	let data = generateGrid();

	/**@type {import('$lib/types').Config} config - config of sets icons and colors.*/
	let config = { colors: COLOR_PLAYERS[0], icons: ICON_PLAYERS[0] };

	/**@type {string} currentPlayer - current player turn on.*/
	let currentPlayer = '';

	function generateGrid() {
		const _template = Array(9)
			.fill('')
			.map((_, i) => ({
				pos: MAPPED_PAD[i],
				active: false,
				player: undefined,
				value: MAPPED_PAD[i]
			}));

		return _template;
	}

	/**@param {import('$lib/types').DataItem} item*/
	function activeAllSquare(item) {
		if (!item.active) {
			item.value = '';
			item.active = true;
		}

		return item;
	}

	function setWinner() {
		winner = true;
		data = data?.map(activeAllSquare);
		score[currentPlayer] = [...score[currentPlayer], config.icons[currentPlayer]];
		count++;

		// show confettis celebration
		jsConfetti.addConfetti({ confettiNumber: 20 });
	}

	/**@param {number} pos*/
	function action(pos) {
		play = true;

		try {
			const register = registerMove(pos);
			if (!register) Error(`position ${pos} is active`);

			const actives = data?.filter((item) => item.active);
			if (actives.length < 5) Error('position is active');

			const data_filter = actives
				.filter((r) => r.active && r.player === currentPlayer)
				.map((e) => e.pos);

			const win = calculateWinner(data_filter);

			if (win) return setWinner();

			if (data?.every((e) => e.active)) {
				equals = true;
				currentPlayer = '';
			}
		} catch (error) {
			console.log(error);
			return;
		}

		switchPlayer();
	}

	function switchPlayer() {
		currentPlayer = currentPlayer === 'a' ? 'b' : 'a';
	}

	/**@param {number} pos*/
	function registerMove(pos) {
		const index = data.findIndex((ele) => ele.pos === pos);

		if (index != -1) {
			const target = data[index];

			if (target.active) return false;

			target.value = config.icons[currentPlayer];
			target.player = currentPlayer;
			target.active = true;

			data[index] = target;
		}

		return true;
	}

	/**
	 * @param {number[]} data_filter
	 */
	function calculateWinner(data_filter) {
		let existWinner = false;

		for (let index = 0; index < LINES.length; index++) {
			const [a, b, c] = LINES[index];

			if (data_filter.includes(a) && data_filter.includes(b) && data_filter.includes(c)) {
				winner_combination = [a, b, c];
				existWinner = true;
				break;
			}
		}

		return existWinner;
	}

	function restart() {
		const scores = [[...score.a], [...score.b]];
		const winnerSession = scores.some((e) => {
			return e.length >= sessionCount;
		});

		if (winnerSession) score = { a: [], b: [] };

		play = false;
		winner = false;
		data = generateGrid();
		equals = false;
		currentPlayer = '';
	}

	function tieTest() {
		currentPlayer = count % 2 === 0 ? 'a' : 'b';
		const combination = [
			[7, 9, 1, 3, 5, 4, 8, 2, 6],
			[7, 4, 1, 2, 8, 5, 6, 9, 3]
		];
		const randomN = (/** @type {number} */ max) => Math.floor(Math.random() * max);

		const n = randomN(combination.length);

		combination[n].forEach((r) => {
			const index = data.findIndex((e) => e.pos === r);
			action(data[index].pos);
		});
	}

	function winTest() {
		currentPlayer = count % 2 === 0 ? 'a' : 'b';
		play = true;

		const randomN = (/** @type {number} */ max) => Math.floor(Math.random() * max) + 1;

		const n = randomN(LINES.length - 1);
		const rest = data.filter(
			(r) => r.pos !== LINES[n][0] && r.pos !== LINES[n][1] && r.pos !== LINES[n][2]
		);

		LINES[n].forEach((e, i) => {
			const index = data.findIndex((t) => t.pos === e);
			action(data[index].pos);
			if (i < 2) action(rest[i].pos);
		});
	}

	function restartSession() {
		count = 0;
		score = { a: [], b: [] };
		restart();
	}

	async function playGame() {
		currentPlayer = count % 2 === 0 ? 'a' : 'b';
		play = true;
		/**@type {HTMLButtonElement | null}*/
		const firstSquare = document.querySelector('[data-i="0"]');
		await tick();
		firstSquare?.focus();
	}
</script>

<section
	style:--bg-a={config.colors.a}
	style:--bg-b={config.colors.b}
	style:--co-a={config.colors.a_co}
	style:--co-b={config.colors.b_co}
>
	<Counter
		bind:sessionCount
		bind:nameA
		bind:nameB
		{play}
		{currentPlayer}
		{winner}
		{equals}
		{score}
	/>

	<Board
		{score}
		{currentPlayer}
		{data}
		{config}
		{winner}
		{winner_combination}
		{equals}
		{play}
		{sessionCount}
		on:play={playGame}
		on:restart={restart}
		on:session={restartSession}
		on:action={({ detail }) => action(detail.pos)}
	/>

	{#if play && !winner && !equals}
		<Shortcuts {data} />
	{:else}
		<Settings
			{winTest}
			{tieTest}
			{play}
			bind:icons={config.icons}
			bind:colors={config.colors}
			bind:sessionCount
		/>
	{/if}
</section>
