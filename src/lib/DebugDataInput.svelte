<script>
	import { data, debug_setData } from "../stores.js";
</script>

<h2>Raw Data</h2>
<textarea
	value={JSON.stringify($data, undefined, 2)}
	on:input={({ target: { value } }) => debug_setData(JSON.parse(value))}
/>

<style>
	textarea {
		width: 100%;
		height: 100%;
		resize: none;
	}
</style>
