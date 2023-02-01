<script>
	import { filter } from "../../stores";
</script>

<h1>Welcome to <span class="covid">Covi</span>sualize<span class="covid">d</span></h1>
<p>
	Visualize the impacts of the COVID-19 regulations on the <strong>hospitality</strong> industry.
</p>
<p>
	The <strong>map</strong> gives an overview of the currently selected variable
	({$filter.variable}) <strong>per state</strong>. States can be selected for more details by
	clicking on them or deselected by clicking on them again. <strong>Note:</strong> the map does
	not completely represent topographic scale. The city-states Bremen, Berlin and Hamburg have been
	magnified so that they can be seen and clicked more easily.
</p>
<p>
	On the <strong>timeline</strong>, the national total can be seen for each day, as well as a
	state-specific line if a state is selected. The date is selected with the scrubber and can be
	moved automatically forward in time by using the play button.
</p>
<p>
	When <strong class="covid">COVID-19 regulations</strong> are active, these are shown in the
	bars above the states in the map with <strong class="covid">red coloring</strong>.
</p>

<style>
	.covid {
		color: var(--c-covid);
	}
</style>
