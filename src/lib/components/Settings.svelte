<script>
	import { scale } from 'svelte/transition';
	import { ICON_PLAYERS, COLOR_PLAYERS } from '$lib/constants';

	/**@type {boolean}*/
	export let play;

	/**@type {number}*/
	export let sessionCount;

	/**@type {any}*/
	export let winTest;

	/**@type {any}*/
	export let tieTest;

	/**@type {import('$lib/types').IconSet}*/
	export let icons;

	/**@type {import('$lib/types').ColorSet}*/
	export let colors;
</script>

{#if !play}
	<div in:scale={{ start: 0.9 }} class="setting">
		<div class="group">
			<label class="label" for="icons">Icons:</label>
			<select name="icons" id="icons" bind:value={icons} disabled={play}>
				{#each ICON_PLAYERS as set}
					{@const { a, b } = set}
					<option value={set}>{a.toUpperCase()} vs {b.toUpperCase()}</option>
				{/each}
			</select>
		</div>

		<div class="group">
			<label class="label" for="colors">Colors:</label>
			<select name="icons" id="colors" bind:value={colors} disabled={play}>
				{#each COLOR_PLAYERS as set}
					<option value={set}>{set.label.toUpperCase()}</option>
				{/each}
			</select>
			<div class="colors">
				<input type="color" value={colors.a} disabled />
				<input type="color" value={colors.b} disabled />
			</div>
		</div>

		<div class="group">
			<label class="label" for="range">Rounds: {sessionCount}</label>
			<input type="range" id="range" min="4" max="10" bind:value={sessionCount} disabled={play} />
		</div>

		<div class="group">
			<label class="label" for="test">test: </label>
			<button on:click={winTest} disabled={play}>win</button>
			<button on:click={tieTest} disabled={play}>tie</button>
		</div>
	</div>
{/if}

<style>
	.setting {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		justify-content: center;
		flex-basis: 100%;
		padding: 1em;
		margin-inline: auto;
		max-width: 900px;
	}

	.group {
		flex-basis: auto;
		flex-shrink: 1;
		min-width: 150px;
		position: relative;
		border-radius: 7px;
	}

	.colors {
		position: absolute;
		top: 0;
		right: 0;
	}

	.label {
		display: block;
		width: 100%;
		font-size: 0.8rem;
		margin-block-end: 0.5em;
	}

	select {
		text-align: center;
		padding-block: 0.3rem;
		padding-inline: 1rem;
		width: 100%;
		border-radius: 5px;
	}
	input[type='color'] {
		border: none;
		background-color: transparent;
		padding: 0px;
		height: 20px;
		width: 30px;
	}

	input[type='range'] {
		width: 100%;
		accent-color: rgb(101, 215, 158);
	}
</style>
