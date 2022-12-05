export const getStateName = (id) => {
	return {
		bw: "Baden-Württemberg",
		by: "Bavaria",
		be: "Berlin",
		bb: "Brandenburg",
		hb: "Bremen",
		hh: "Hamburg",
		he: "Hesse",
		mv: "Lower Saxony",
		ni: "Mecklenburg-Vorpommern",
		nw: "North Rhine-Westphalia",
		rp: "Rhineland-Palatinate",
		sl: "Saarland",
		sn: "Saxony",
		st: "Saxony-Anhalt",
		sh: "Schleswig-Holstein",
		th: "Thuringia",
	}[id];
};
