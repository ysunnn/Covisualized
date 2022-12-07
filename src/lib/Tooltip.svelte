<script>
	export let date;
	export let value;
	export let left;

	const width = 80;
	const height = 40;
</script>

<div
	class="arrowBox"
	style:--after-border="{height / 6}px"
	style:width="{width}px"
	style:height="{height}px"
	style:left="{left - width / 2}px"
	style:line-height="{height / 2}px"
	style:--after-margin-left="{-height / 4}px"
>
	{date}
	{value}
</div>

<style>
	.arrowBox {
		z-index: 0;
		background-color: #000;
		border-radius: 2px;
		position: relative;
		font-size: 0.725em;
		font-weight: 200;
		color: white;
		text-align: center;
		left: 50px;
	}

	.arrowBox:after {
		content: " ";
		z-index: 0;
		width: 0;
		height: 0;
		border-top: var(--after-border) solid #000;
		border-left: var(--after-border) solid transparent;
		border-bottom: var(--after-border) solid transparent;
		border-right: var(--after-border) solid transparent;
		border-radius: 2px;
		position: absolute;
		right: 50%;
		top: 100%;
		margin-right: -7px;
	}
</style>
