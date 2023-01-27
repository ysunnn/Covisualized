<script>
	import Profile from "../lib/Profile.svelte";

	const people = [
		{ picture: "yss", name: "Yousun", text: "Yousun is exploring many areas of computer science, from data science to quantum computers. In this project, she is responsible for programming and constantly looking for new ideas." },
		{ picture: "grafik", name: "Felix", text: "Felix previously got his bachelor's degree in information design and is still wondering how he ended up in a computer science master's. With a tendency for perfectionism (at least when invested in a project...), he is responsible for a clean codebase and pixel pushing the UI of the project." },
		{ picture: "image", name: "Janka", text: "Janka is a computer science master's student. Besides chocolate ice cream, hot chocolate and chocolate cookies, she also likes coding and bothering her team members with project planning. Her role in the team: Project management." },
		{ picture: "goodcat", name: "Timy", text: "Timy is a grad student in computer science and a dabbler in artificial intelligence, particularly decision-making and computer vision. He is tasked with managing and analyzing the datasets so that interesting insights can be visualized in the UI." },
		{ picture: "simon", name: "Simon", text: "Simon is a former physics student and enthusiastic coffee drinker, who likes to play around with data. His role in the team falls in the realms of Mädchen für alles." },
	];

</script>
<main>
	<h1>Meet the team</h1>
	<ul>
		{#each people as person}
			<Profile {person} />
		{/each}
	</ul>
</main>

<style>
</style>
