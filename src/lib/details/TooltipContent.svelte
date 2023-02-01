<script>

	export let data;
</script>

<div class="entry">
	<span class="label">
		{data?.key}:&nbsp;
	</span>
	<span class="value">
		<b>{data?.value}</b>
	</span>
</div>

<style>
	.entry {
		display: flex;
		align-items: center;
	}
</style>
