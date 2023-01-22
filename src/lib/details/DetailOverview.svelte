<script>
	import { onMount } from "svelte";

	const valueItems = [
		{ label: "Revenue", amount: 421208, difference: 1413, value: 1 },
		{ label: "Employees", amount: 76157, difference: 10, value: 2 },
		{ label: "Salaries", amount: 1422, difference: -23, value: 3 },
		{ label: "COVID-19 Cases", amount: 1810, difference: 8, value: 4 },
	];

	let currentValue;

	onMount(() => {
		if (Array.isArray(valueItems) && valueItems.length && valueItems[0].value) {
			currentValue = valueItems[0].value;
		}
	});

	const handleClick = tabValue => () => (currentValue = tabValue);

</script>

{#if Array.isArray(valueItems)}
	{#each valueItems as item}
		{#if currentValue === item.value}
			<span on:click={handleClick(item.value)}>
				<table class="active">
					<tr>
						<th class="label">{item.label}</th>
						<th>{valueItems[currentValue - 1].amount}€</th>
						{#if valueItems[currentValue - 1].difference >= 0}
							<th class="positive">(+{valueItems[currentValue - 1].difference})</th>
						{:else}
							<th class="negative">({valueItems[currentValue - 1].difference})</th>
						{/if}
					</tr>
				</table>
			</span>
		{/if}
	{/each}
	{#each valueItems as item}
		{#if currentValue !== item.value}
			<span on:click={handleClick(item.value)}>{item.label}</span>
		{/if}
	{/each}
{/if}

<style>
    .positive{
        color: green;
    }
    .negative {
        color: red;
    }
    .active {
        font-size: 30px;
    }
    .label {
        font-weight: bold;
        padding-right: 25px;
    }
    span {
      border: 1px solid transparent;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      display: block;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    span:hover {
      border-color: #e9ecef #e9ecef #dee2e6;
    }
</style>
