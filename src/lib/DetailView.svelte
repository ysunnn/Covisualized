<script>
	import path from "../assets/Bayern.png";
	import mask from "../assets/masks.png";
	import vaccinated from "../assets/vaccines.png";
	import distance from "../assets/6_ft_apart.png";
	import personlimit from "../assets/reduce_capacity.png";

	import { filter } from "../stores";
	import { getStateName } from "../util";
	import data from "../assets/2019";
	import BarChart from "./BarChart.svelte";

	$: ({ state } = $filter);

</script>

<div id="header">
	<h2>{getStateName(state) || "None"}</h2>
	<img id="flag" src={path} alt="flag" height="80px" width="120px" />
</div>
<div id="regulations">
	<img src={mask} alt="flag" height="15px" width="30px" />
	<p> Masks in Public </p>
	<img src={personlimit} alt="flag" height="30px" width="30px" />
	<p> max. 4 People </p>
	<img src={distance} alt="flag" height="30px" width="30px" />
	<p> Social Distancing </p>
	<img src={vaccinated} alt="flag" height="30px" width="20px" />
	<p> 2x Vaccinated </p>
</div>
<h2> National Comparison </h2>
<BarChart {data} />

<style>
    h2 {
        text-align: start;
        margin-left: 150px;
    }
    div {
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 30px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }
    img {
        align-self: center;
    }
    #regulations {
        background-color: #d8aeae;
        border-radius: 5px;
        display: flex;
        margin-left: 150px;
    }
    p {
        color: #a43e45;
        font-weight: bold;
    }
    #flag {
        border:3px solid #000000;
        border-radius: 5px;
    }
</style>
