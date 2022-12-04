<script>
	import LineChart from "./LineChart.svelte";
	export let chartProps;
</script>
<section class="container">
	<svelte:component this={LineChart} {...chartProps}/>
</section>
<style>
.container {
   max-width: 640px;
   border: solid 1px black;
   margin: auto;
}
</style>
