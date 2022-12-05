import { readable, writable, derived } from "svelte/store";

// TODO: get more extensive data set (with time), remove debug features
export const states = [
	"bw", "by", "be", "bb", "hb", "hh", "he", "mv",
	"ni", "nw", "rp", "sl", "sn", "st", "sh", "th",
];
const generateExampleData = () => Object.fromEntries(states.map(id => {
	return [id, {
		variables: {
			revenue: Math.ceil(Math.random() * 100),
		},
		regulations: Object.fromEntries([
			"leavehome", "dist", "msk", "shppng", "hcut", "ess_shps",
			"zoo", "demo", "school", "church", "onefriend", "morefriends",
			"plygrnd", "daycare", "trvl", "gastr",
		].map(id => {
			const bias = Math.ceil(Math.random() * 3);
			return [id, Math.floor(Math.random() * bias)];
		})),
	}];
}));

export let debug_setData, debug_randomizeData;
export const data = readable(generateExampleData(), (set) => {
	debug_randomizeData = () => set(generateExampleData());
	debug_setData = (data) => set(data);
});

export const filter = writable({ variable: "revenue", state: null });

export const valuesPerState = derived([data, filter], ([$data, $filter]) => {
	const states = Object.entries($data).map(([id, { variables, regulations }]) => {
		return {
			id,
			value: variables[$filter.variable],
			regulationsTotal: Object.entries(regulations).reduce((total, [, value]) => total + value, 0),
		};
	});
	return {
		states,
		max: {
			value: Math.max(...states.map(s => s.value)),
			regulationsTotal: Object.keys($data.bw.regulations).length * 2,
		},
	};
});
