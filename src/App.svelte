<script>
	import Home from "./views/Home.svelte";
	import About from "./views/About.svelte";
	import { page } from "./stores";
</script>


{#if $page === "home"}
	<Home />
{:else}
	<About />
{/if}
