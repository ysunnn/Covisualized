import { readable, writable, derived } from "svelte/store";
import { parseRevenue, parseEmployees, parseIncidences, parseRegulations, parseRegulationsIndex } from "./assets/data";
import { isNullish, stateIDs } from "./util";

export const parsed = writable(false);
export const filter = writable({ date: null, state: null, variable: "revenue" });
export const playback = writable({ play: false, playing: false, playingBlockers: new Map(), stepDuration: 1200 });
export const tutorial = writable({
	step: localStorage.getItem("tutorial-done") ? 0 : 1, // step 0 => tutorial done
	playButtonEl: null,
});
tutorial.subscribe(({ step }) => {
	if (step === 0) localStorage.setItem("tutorial-done", true);
});

const parseData = async () => {
	/** @type {{ [date: string]: { [state: string]: { [variable: string]: number } | { regulations: 0 | 1 | 2 } } } }} */
	const data = {};

	// parser function must return date (YYYY-MM), state (id), value (as number)
	const addVariable = async (variable, parser, ...args) => {
		for (const { date, state, value } of await parser(...args)) {
			if (!data[date]) data[date] = {};
			if (!data[date][state]) data[date][state] = {};
			data[date][state][variable] = value;
		}
	};

	await addVariable("revenue", parseRevenue);
	await addVariable("employees", parseEmployees);
	await addVariable("incidences", parseIncidences);
	await addVariable("regulations", parseRegulations);
	await addVariable("regulationsIndex", parseRegulationsIndex);

	return data;
};
export let DEBUGSetData;
export const data = readable({}, (set) => {
	// Our main data store is an empty object on page load. Once all data has been parsed,
	// it gets updated with it accordingly:
	(async () => {
		const data = await parseData();
		set(data);

		// Set selected date to the earliest available one:
		filter.update(filterOptions => ({
			...filterOptions,
			date: Object.keys(data).reduce((earliest, current) => earliest > current ? current : earliest),
		}));

		parsed.set(true);
	})();

	DEBUGSetData = (data) => set(data);
});

export const dataAtDate = derived([data, filter], ([$data, $filter]) => {
	return $data[$filter.date];
});

export const statesForVariableAtDate = derived([data, filter], ([$data, $filter]) => {
	const allValuesForVariable = Object.values($data).flatMap(states => {
		return Object.values(states).flatMap(variables => variables[$filter.variable]);
	}).filter(value => !isNullish(value));
	const allRegulationsIndices = Object.values($data).flatMap(states => {
		return Object.values(states).flatMap(variables => variables.regulationsIndex);
	}).filter(value => !isNullish(value));

	const ranges = {
		value: {
			min: Math.min(...allValuesForVariable),
			max: Math.max(...allValuesForVariable),
		},
		regulationsIndex: {
			min: 0,
			max: Math.max(...allRegulationsIndices), // dataset actually implies a fixed 100 here
		},
	};

	return {
		ranges,
		states: Object.fromEntries(stateIDs.map(stateID => {
			const variables = ($data[$filter.date] || {})[stateID];
			const value = variables?.[$filter.variable];
			const regIndex = $filter.date < "2020-03" ? 0 : variables?.regulationsIndex;
			return [stateID, {
				value,
				valueFrac: value && (value - ranges.value.min) / (ranges.value.max - ranges.value.min),
				regulationsIndex: regIndex,
				regulationsIndexFrac: regIndex && (regIndex - ranges.regulationsIndex.min) / (ranges.regulationsIndex.max - ranges.regulationsIndex.min),
			}];
		})),
	};
});

export const availableDatesForVariable = derived([data, filter], ([$data, $filter]) => {
	return Object.entries($data)
		.filter(([, states]) => !isNullish(states?.de[$filter.variable]))
		.map(([date]) => date)
		.sort((a, b) => a < b ? -1 : 1);
});
