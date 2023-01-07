<script>
	import { filter } from "../../stores";
</script>

<h2>Active Filters</h2>
<label>Date</label>
<input
	type="date"
	value={`${$filter.date}-01`}
	on:input={({ target: { value } }) => $filter.date = (value.slice(0, 7))}
/>
<label>State</label>
<input type="text" bind:value={$filter.state} />
<label>Variable</label>
<input type="text" bind:value={$filter.variable} />
