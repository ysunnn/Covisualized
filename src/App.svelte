<script>
	import { parsed } from "./stores";

	import Loading from "./views/Loading.svelte";
	import Home from "./views/Home.svelte";
	import About from "./views/About.svelte";

	const pages = {
		"home": Home,
		"about": About,
	};
	let page = "home";
</script>

{#if $parsed}
	<svelte:component this={pages[page]} bind:page />
{:else}
	<Loading />
{/if}
