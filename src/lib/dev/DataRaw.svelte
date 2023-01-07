<script>
	import { data, DEBUGSetData, DEBUGReparseData } from "../../stores";
</script>

<h2>Raw Data</h2>
<button on:click={() => DEBUGReparseData()}>
	Re-parse Dataset
</button>
<textarea
	value={JSON.stringify($data, undefined, 2)}
	on:input={({ target: { value } }) => DEBUGSetData(JSON.parse(value))}
/>

<style>
	textarea {
		flex-grow: 1;
		margin-top: 1rem;
		resize: none;
	}
</style>
