import { readable, writable, derived } from "svelte/store";

// TODO: get more extensive data set (with time), remove debug features
export let debug_setData;
export const data = readable({
	bw: { revenue: 54 },
	by: { revenue: 32 },
	be: { revenue: 74 },
	bb: { revenue: 102 },
	hb: { revenue: 53 },
	hh: { revenue: 26 },
	he: { revenue: 73 },
	mv: { revenue: 84 },
	ni: { revenue: 36 },
	nw: { revenue: 78 },
	rp: { revenue: 55 },
	sl: { revenue: 27 },
	sn: { revenue: 84 },
	st: { revenue: 52 },
	sh: { revenue: 63 },
	th: { revenue: 95 },
}, (set) => {
	debug_setData = (data) => set(data);
});

export const filter = writable({ variable: "revenue", state: null });

export const valuesPerState = derived([data, filter], ([$data, $filter]) => {
	const states = Object.entries($data).map(([id, variables]) => {
		return { id, value: variables[$filter.variable] };
	});
	return { states, max: Math.max(...states.map(s => s.value)) };
});
