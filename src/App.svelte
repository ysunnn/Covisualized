<script>
	import Home from "./views/Home.svelte";
	import About from "./views/About.svelte";

	const pages = {
		"home": Home,
		"about": About,
	};
	let page = "home";
</script>


<svelte:component this={pages[page]} bind:page />
