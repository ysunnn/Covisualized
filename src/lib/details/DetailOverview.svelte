<script>
	import { onMount } from "svelte";

	const valueItems = [
		{ label: "Revenue", amount: 421208, difference: 1413, value: 1 },
		{ label: "Employees", amount: 76157, difference: 10, value: 2 },
		{ label: "COVID-19 Cases", amount: 1810, difference: 8, value: 3 },
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
				<ul class="active">
					<li class="label">{item.label}</li>
					<li>{item.amount}€</li>
					{#if item.difference >= 0}
						<li class="positive">(+{item.difference})</li>
					{:else}
						<li class="negative">({item.difference})</li>
					{/if}
				</ul>
			</span>
		{/if}
	{/each}
	{#each valueItems as item}
		{#if currentValue !== item.value}
			<span on:click={handleClick(item.value)}>
				<ul>
					<li class="label">{item.label}</li>
					<li>{item.amount}€</li>
					{#if item.difference >= 0}
						<li class="positive">(+{item.difference})</li>
					{:else}
						<li class="negative">({item.difference})</li>
					{/if}
				</ul>
			</span>
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
	ul {
		list-style-type: none;
		text-align: left;
		margin: 0;
		padding: 0;
	}
	li {
		display: inline-block;
	}
    span:hover {
      border-color: #e9ecef #e9ecef #dee2e6;
    }
</style>
