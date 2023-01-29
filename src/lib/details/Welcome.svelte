<script>
	import { filter } from "../../stores";
</script>

<h1>Welcome to <span class="covid">Covi</span>sualiz<span class="covid">ed</span></h1>
<p>
	Visualize the impacts of the COVID-19 regulations on the <strong>hospitality</strong> industry.
</p>
<p>
	The <strong>map</strong> gives an overview of the currently selected variable
	({$filter.variable}) <strong>per state</strong>. States can be selected for more details by
	clicking on them or deselected by clicking on them again.
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
