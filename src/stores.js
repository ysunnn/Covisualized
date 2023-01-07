import { readable, writable, derived } from "svelte/store";
import { parseRevenue } from "./assets/data";

const parseData = async () => {
	/** @type {{ [date: string]: { [state: string]: { [variable: string]: number } | { regulations: 0 | 1 | 2 } } } }} */
	const data = {};

	// parser function must return date (YYYY-MM-DD), state (id), value (as number)
	const addVariable = async (variable, parser) => {
		for (const { date, state, value } of await parser()) {
			if (!data[date]) data[date] = {};
			if (!data[date][state]) data[date][state] = {};
			data[date][state][variable] = value;
		}
	};

	await addVariable("revenue", parseRevenue);

	// Create some mock data for the regulations for now...
	for (const date in data) {
		for (const state in data[date]) {
			const regulations = Object.fromEntries([
				"leavehome", "dist", "msk", "shppng", "hcut", "ess_shps",
				"zoo", "demo", "school", "church", "onefriend", "morefriends",
				"plygrnd", "daycare", "trvl", "gastr",
			].map(id => {
				const bias = Math.ceil(Math.random() * 3);
				return [id, Math.min(Math.floor(Math.random() * bias + 0.5), 2)];
			}));
			const total = Object.entries(regulations).reduce((total, [, value]) => total + value, 0);
			data[date][state]["regulations"] = regulations;
			data[date][state]["regulationsTotal"] = total;
		}
	}

	return data;
};

export const filter = writable({ date: null, state: null, variable: "revenue" });

export let DEBUGSetData, DEBUGReparseData;
export const data = readable({}, (set) => {
	// Our main data store is an empty object on page load. Once all data has been parsed,
	// it get's updated with it accordingly:
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
	});
	return {
		ranges: {
			value: {
				min: Math.min(...allValuesForVariable),
				max: Math.max(...allValuesForVariable),
			},
			regulationsTotal: {
				min: 0,
				max: 32, // 16 regulations * max weight 2
			},
		},
		states: Object.fromEntries(
			Object.entries($data[$filter.date] || {}).map(([stateID, variables]) => [stateID, {
				value: variables[$filter.variable],
				regulationsTotal: variables.regulationsTotal,
			}]),
		),
	};
});
