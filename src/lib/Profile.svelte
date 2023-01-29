<script>
	import { getProfilePicture } from "../util";
	export let person;
</script>
<div class="card">
	<h1>{person.name[0].toUpperCase() + person.name.substring(1)}</h1>
	<div class="cols">
		<img
			class="profile_picture"
			src={getProfilePicture(person.name)}
			alt={person.text} />
		<p class="text">{@html person.text}</p>
	</div>
</div>

<style>
	.card {
		padding: 5px;
		margin: 5px;
		background: white;
		border-radius: 6px;
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
	}
	.cols {
		display: grid;
		grid-template-areas:
			"profile_picture text";
		gap: 1em;
	}
	.text {
		padding-left: 5px;
		line-break: auto;
	}
	.profile_picture {
		height: 5em;
		border: 4px solid var(--c-foreground);
		border-radius: 6px;
		flex-shrink: 0;
	}
</style>
