<script>
	import { scale } from 'svelte/transition';
	import up from '$lib/icons/up.svg?raw';
	import down from '$lib/icons/down.svg?raw';
	import left from '$lib/icons/left.svg?raw';
	import right from '$lib/icons/right.svg?raw';

	/**@type {import('$lib/types').Data}*/
	export let data;

	const ARROWS = [null, up, null, left, down, right];
</script>

<div in:scale={{ start: 0.9, delay: 600 }}>
	<div class="bulb">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="icon"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
			/>
		</svg>
		use keyboard
	</div>

	<div class="shortcuts">
		<div class="direction">
			{#each ARROWS as key, i}
				<div class:key>
					{#if key}
						{@html key}
					{/if}
				</div>
			{/each}
		</div>
		<div class="numpad">
			{#each data as _, i}
				<div class="key">{_.pos}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.bulb {
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		gap: 0.5em;
		padding-block: 0.5rem;
		padding-inline: 0.8rem;
		border-radius: 50vh;
	}

	.shortcuts {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.direction,
	.numpad {
		--key-size: 30px;
		display: grid;
		gap: 0.2rem;
		grid-template-columns: repeat(3, var(--key-size));
	}
	.direction {
		grid-template-rows: repeat(2, var(--key-size));
	}

	.numpad {
		grid-template-rows: repeat(3, var(--key-size));
	}

	.key {
		opacity: 0.5;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-darkish);
		/* border-radius: calc(var(--key-size) / 2); */
		border-radius: 3px;
	}

	.icon {
		color: rgb(255, 228, 129);
	}
</style>
