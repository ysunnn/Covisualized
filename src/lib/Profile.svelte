<script>
	import { getProfilePicture } from "../util";
	export let person;
</script>

<div class="card">
	<h1>{person.name[0].toUpperCase() + person.name.substring(1)}</h1>
	<div class="content">
		<img
			src={getProfilePicture(person.name)}
			alt={person.text} />
		<p class="text">{person.text}</p>
	</div>
</div>

<style>
	.card {
		padding: 1em;
		padding-bottom: 2em;
		background: white;
		border: 6px solid hsl(var(--c-foreground-hsl), 0.15);
		border-radius: 12px;
		box-shadow: 0 1em 2em 0 rgb(0, 0, 0, 0.08);
	}

	.text {
		padding-left: 5px;
		line-break: auto;
	}

	.content {
		display: flex;
		align-items: flex-start;
	}

	p {
		margin: 0;
	}

	img {
		flex-shrink: 0;
		margin-right: 1em;
		margin-bottom: 0.5em;

		width: 25%;
		border: 4px solid var(--c-foreground);
		outline: 4px solid white;
		box-shadow: 0 0.25em 1em 0 rgb(0, 0, 0, 0.2);
		border-radius: 6px;
	}
</style>
