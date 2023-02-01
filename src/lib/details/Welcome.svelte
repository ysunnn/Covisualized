<script>
	import { filter } from "../../stores";
</script>

<h1>Welcome to <span class="covid">Covi</span>sualize<span class="covid">d</span></h1>
<p>
	Visualize the impacts of the COVID-19 regulations on the <strong>hospitality</strong> industry.
</p>
<p>
	The <strong>map</strong> gives an overview of the currently selected variable
	({$filter.variable}) <strong>per state</strong> per month. Details for a state
	can be toggled by clicking on them.
</p>
<p>
	On the <strong>timeline</strong>, the national total can be seen for each month, as well as a
	state-specific line if a state is selected. A month is selected via playback or scrubber.
</p>
<p>
	When <strong class="covid">COVID-19 regulations</strong> are in place, these are shown in the
	bars above the states in the map with <strong class="covid">red coloring</strong>.
</p>
<p>
	<small>
		<strong>Note:</strong> States are not shown to topographic scale. The city-states Bremen,
		Berlin and Hamburg have been magnified so that they can be seen and clicked more easily.
	</small>
</p>
<style>
	.covid {
		color: var(--c-covid);
	}
</style>
