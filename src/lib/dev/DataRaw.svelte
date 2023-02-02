<script>
	import { data, DEBUGSetData } from "../../stores";
</script>

<h2>Raw Data</h2>
<textarea
	value={JSON.stringify($data, undefined, 2)}
	on:input={({ target: { value } }) => DEBUGSetData(JSON.parse(value))}
/>

<style>
	textarea {
		flex-grow: 1;
		resize: none;
	}
</style>
