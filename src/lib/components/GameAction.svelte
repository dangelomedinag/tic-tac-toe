<script>
	import ButtonAction from './ButtonAction.svelte';

	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	/**@type {boolean}*/
	export let play;
	/**@type {boolean}*/
	export let winner;
	/**@type {boolean}*/
	export let equals;
	/**@type {boolean}*/
	export let missing;
	/**@type {boolean}*/
	export let missingState;
	/**@type {import('$lib/types').Score}*/
	export let score;

	/**@type {number}*/
	export let sessionCount;
</script>

{#if !play || winner || equals}
	<div in:scale={{ delay: !play ? 0 : 1000 }} out:scale={{ start: 0.85 }} class="start">
		{#if !play}
			{@const finalMatch = [score.a.length, score.b.length].every((l) => l >= sessionCount - 1)}
			<ButtonAction
				primary
				words={finalMatch ? 'final match' : 'start'}
				on:click={() => {
					dispatch('play');
					missingState = missing;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="w-6 h-6"
				>
					<path
						fill-rule="evenodd"
						d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
						clip-rule="evenodd"
					/>
				</svg>
			</ButtonAction>

			{#if !missingState}
				<label class="label info" for="missing"
					>Before starting each game, you can set the name, rounds, icons and colors.<input
						type="checkbox"
						id="missing"
						bind:checked={missing}
					/>no volver a recordar</label
				>
			{/if}
		{:else}
			<ButtonAction delay={400} primary on:click={() => dispatch('restart')} words="play again">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
					/>
				</svg>
			</ButtonAction>
			{@const session = Boolean(score.a.length) || Boolean(score.b.length)}
			{@const endSession = score.a.length >= sessionCount || score.b.length >= sessionCount}
			{#if session}
				{#if endSession}
					<div class="label">this session end</div>
				{:else}
					<ButtonAction delay={800} on:click={() => dispatch('session')} words="restart session">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
							/>
						</svg></ButtonAction
					>
				{/if}
			{/if}
		{/if}
	</div>
{/if}

<style>
	.start {
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		z-index: 1;
		background-color: var(--bg-overlay);
		height: 100%;
		gap: 1em;
		padding-inline: 1em;
	}

	.label {
		margin-top: 0.5em;
		display: inline-flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5em;
		font-size: 0.8rem;
		max-width: 300px;
	}

	.info {
		accent-color: rgb(101, 215, 158);
		border: 1px solid rgba(101, 215, 158, 0.5);
		padding: 1em;
		border-radius: 10px;
		background-color: var(--color-darkish);
		color: var(--color-lightish);
		opacity: 0.7;
	}

	.info:hover {
		opacity: 1;
		cursor: pointer;
	}

	.info:active {
		cursor: pointer;
		opacity: 0.7;
		transform: translateY(5%);
	}
</style>
