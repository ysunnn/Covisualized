<script>
	import BarChartReactive from "./BarChartReactive.svelte";
	import BarChartD3 from "./BarChartD3.svelte";

	let values = [40, 86, 168, 281, 303, 365, 400];

	function randomize() {
		values = values.map((value) => Math.round(value + (Math.random() * 20 - 10)));
	}

	function add() {
		values = [...values, (values.at(-1) || 0) + Math.round(Math.random() * 30 + 10)];
	}

	function remove() {
		values.pop();
		values = values; // Svelte is reactive on assignment only.
	}
</script>

<h2>Reactive Example Chart</h2>
<BarChartReactive {values} />

<h2>D3 Example Chart</h2>
<BarChartD3 {values} />

<div class="buttons">
	<button on:click={randomize}>
		Randomize values
	</button>
	<button on:click={add}>
		Add
	</button>
	<button on:click={remove}>
		Remove
	</button>
</div>

<style>
	.buttons {
		margin-top: 1em;
		display: flex;
		gap: 0.5em;
	}
	.buttons > * { flex-grow: 1; }
</style>
