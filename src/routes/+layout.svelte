<script>
	import 'normalize.css';
	import '../app.css';
	import githubIcon from '$lib/icons/github.svg?raw';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<title>Tic Tac Toe</title>
	<meta name="title" content="Tic Tac Toe | Fun playing classic game" />
	<meta
		name="description"
		content="Play the classic Tic-Tac-Toe game (also called Noughts and Crosses) for free online with one or two players."
	/>
	<meta property="twitter:title" content="Tic Tac Toe | Fun playing classic game" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@dangelomedinag" />
	<meta
		property="twitter:image"
		content="https://www.gamesver.com/wp-content/uploads/2022/02/Hand-drawn-tic-tac-toe-game.png.webp"
	/>
	<meta name="twitter:creator" content="@dangelomedinag" />
	<meta property="og:title" content="Tic Tac Toe | Fun playing classic game" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="tictactoe-dangelomedinag.vercel.app" />
	<meta
		property="og:image"
		content="https://www.gamesver.com/wp-content/uploads/2022/02/Hand-drawn-tic-tac-toe-game.png.webp"
	/>
	<meta
		property="og:description"
		content="Play the classic Tic-Tac-Toe game (also called Noughts and Crosses) for free online with one or two players."
	/>
	<meta name="keywords" content="game, tic, tac, toe, tic-tac-toe, classic, fun" />
	<meta
		property="twitter:description"
		content="Play the classic Tic-Tac-Toe game (also called Noughts and Crosses) for free online with one or two players."
	/>
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content="twitter/dangelomedinag" />
	<meta name="apple-mobile-web-app-capable" content="no" />
	<meta name="theme-color" content="#1EA0F1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</svelte:head>

<div>
	<header>
		<img src="/favicon.png" alt="game logo" />
		<span>Tic Tac Toe</span>
		<a
			href="https://github.com/dangelomedinag/tic-tac-toe"
			aria-hidden="true"
			aria-label="this project and other mores similar, visit my github profile"
		>
			{@html githubIcon}
		</a>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		made with ❤️ by <a
			href="https://github.com/dangelomedinag"
			aria-hidden="true"
			aria-label="my github profile">Dangelomedinag</a
		>.
	</footer>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
		min-height: 100vh;
		justify-content: space-between;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-inline: 1em;
		padding-block: 0.8em;
		background-color: var(--color-dark);
		border-bottom: 1px solid var(--color-darkish);
	}

	a {
		text-decoration: none;
		color: initial;
		display: inline-block;
	}

	main {
		/* flex-basis: 100%; */
		flex-grow: 1;
	}

	footer {
		font-size: 0.8rem;
		text-align: center;
		padding-inline: 1em;
		padding-block: 2em;
		border-top: 1px solid var(--color-darkish);
	}

	img {
		display: block;
		max-width: 25px;
	}
</style>
