import { readable, writable, derived } from "svelte/store";

// TODO: get more extensive data set (with time), remove debug features
const generateExampleData = () => Object.fromEntries([
	"bw", "by", "be", "bb", "hb", "hh", "he", "mv",
	"ni", "nw", "rp", "sl", "sn", "st", "sh", "th",
].map(id => [id, {
	revenue: Math.ceil(Math.random() * 100),
	regulations: Object.fromEntries([
		"leavehome", "dist", "msk", "shppng", "hcut", "ess_shps",
		"zoo", "demo", "school", "church", "onefriend", "morefriends",
		"plygrnd", "daycare", "trvl", "gastr",
	].map(id => [id, Math.floor(Math.random() * 3)])),
}]));

export let debug_setData, debug_randomizeData;
export const data = readable(generateExampleData(), (set) => {
	debug_randomizeData = () => set(generateExampleData());
	debug_setData = (data) => set(data);
});

export const filter = writable({ variable: "revenue", state: null });

export const valuesPerState = derived([data, filter], ([$data, $filter]) => {
	const states = Object.entries($data).map(([id, variables]) => {
		return { id, value: variables[$filter.variable] };
	});
	return { states, max: Math.max(...states.map(s => s.value)) };
});
