<script>
	import { data, debug_setData, debug_randomizeData } from "../../stores";
</script>

<h2>Raw Data</h2>
<button on:click={() => debug_randomizeData()}>
	Randomize Dataset
</button>
<textarea
	value={JSON.stringify($data, undefined, 2)}
	on:input={({ target: { value } }) => debug_setData(JSON.parse(value))} />

<style>
	textarea {
		flex-grow: 1;
		margin-top: 1rem;
		resize: none;
	}
</style>
