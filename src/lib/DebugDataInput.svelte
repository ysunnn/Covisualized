<script>
	import { data, debug_setData, debug_randomizeData } from "../stores.js";
</script>

<h2>Raw Data</h2>
<button on:click={() => debug_randomizeData()}>
	Randomize Dataset
</button>
<textarea
	value={JSON.stringify($data, undefined, 2)}
	on:input={({ target: { value } }) => debug_setData(JSON.parse(value))}></textarea>

<style>
	textarea {
		width: 100%;
		height: 70%;
		resize: none;
	}
</style>
