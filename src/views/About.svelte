<script>
	import Profile from "../lib/Profile.svelte";
	import Button from "../lib/Button.svelte";

	export let page;

	const people = [{
		name: "yousun",
		text: "Yousun is exploring many areas of computer science, from data science to quantum computers. In this project, she is responsible for programming and constantly looking for new ideas.",
	}, {
		name: "felix",
		text: "Felix previously got his bachelor's degree in information design and is still wondering how he ended up in a computer science master's. With a tendency for perfectionism (at least when invested in a project...), he is responsible for a clean codebase and pixel pushing the UI of the project.",
	}, {
		name: "janka",
		text: "Janka is a computer science master's student. Besides chocolate ice cream, hot chocolate and chocolate cookies, she also likes coding and bothering her team members with project planning. Her role in the team: Project management.",
	}, {
		name: "timy",
		text: "Timy is a grad student in computer science and a dabbler in artificial intelligence, particularly decision-making and computer vision. He is tasked with managing and analyzing the datasets so that interesting insights can be visualized in the UI.",
	}, {
		name: "simon",
		text: "Simon is a former physics student and enthusiastic coffee drinker, who likes to play around with data. His role in the team falls in the realms of Mädchen für alles.",
	}];
</script>

<main>
	<div class="head">
		<h1 class="title">Meet the team</h1>
		<Button on:click={() => page = "home"}>
			Back to Covisualized
		</Button>
	</div>
	<div class="profiles">
		{#each people as person}
			<Profile {person} />
		{/each}
	</div>
</main>

<style>
	.head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.profiles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(24em, 100%), 1fr));
		gap: 2em;
	}

	.title {
		grid-area: title;
	}
</style>
