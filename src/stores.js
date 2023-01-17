import { readable, writable, derived } from "svelte/store";
import { parseRevenue, parseEmployees, parseIncidences, parseRegulations } from "./assets/data";
import { stateIDs } from "./util";

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

	return data;
};

export const filter = writable({ date: null, state: null, variable: "revenue" });

export let DEBUGSetData, DEBUGReparseData;
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
	})();

	DEBUGReparseData = async () => set(await parseData());
	DEBUGSetData = (data) => set(data);
});

export const statesForVariableAtDate = derived([data, filter], ([$data, $filter]) => {
	const allValuesForVariable = Object.values($data).flatMap(states => {
		return Object.values(states).flatMap(variables => variables[$filter.variable]);
	}).filter(value => value);

	const ranges = {
		value: {
			min: Math.min(...allValuesForVariable),
			max: Math.max(...allValuesForVariable),
		},
		regulationsTotal: {
			min: 0,
			max: 32, // 16 regulations * max weight 2
		},
	};

	return {
		ranges,
		states: Object.fromEntries(stateIDs.map(stateID => {
			const variables = ($data[$filter.date] || {})[stateID];
			const value = variables && variables[$filter.variable];
			return [stateID, {
				value,
				valueFrac: value && (value - ranges.value.min) / (ranges.value.max - ranges.value.min),
				regulationsTotal: variables?.regulations?.total,
			}];
		})),
	};
});
