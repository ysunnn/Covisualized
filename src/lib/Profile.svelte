<script>
	import { getProfilePicture } from "../util";
	export let person;
</script>
<div>
		<h1>{person.name}</h1>
		<img class="profile_picture"
				 src={getProfilePicture(person.picture)}
				 alt="a dancing man." />
		<p>{person.text}</p>
</div>

<style>
	.profile_picture {
		height: 5em;
		border: 4px solid var(--c-foreground);
		outline: 4px solid white;
		box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
		border-radius: 6px;
	}

	.profile_picture:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
</style>
