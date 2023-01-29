<script>
	import { getProfilePicture } from "../util";
	export let person;
</script>
<div class="card">
	<h1>{person.name}</h1>
	<img
		class="profile_picture"
		src={getProfilePicture(person.picture)}
		alt={person.text} />
	<p class="text">{@html person.text}</p>
</div>

<style>
	.card {
		padding: 5px;
		margin: 5px;
		float: left;
		width: 250px;
		background: white;
		border-radius: 6px;
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
	}
	.text {
		line-break: auto;
	}
	.card:hover {
		cursor: pointer;
    filter: drop-shadow(0 0 2em var(--c-primary));
  }
	.profile_picture {
		height: 5em;
		border: 4px solid var(--c-foreground);
		border-radius: 6px;
	}
</style>
