import flags from "./assets/flags/index.js";

// Returns a numeric id unique to this project only.
let uid = 0;
export const getUID = () => {
	return uid++;
};

export const isNullish = (value) => (value === null || value === undefined);

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const mapRange = (value, inMin, inMax, outMin, outMax) => {
	return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

export const stateIDs = [
	"bw", "by", "be", "bb", "hb", "hh", "he", "mv",
	"ni", "nw", "rp", "sl", "sn", "st", "sh", "th",
];

export const getStateFlag = (id) => {
	return flags[id];
};

export const getStateName = (id) => {
	return {
		bw: "Baden-Württemberg",
		by: "Bavaria",
		be: "Berlin",
		bb: "Brandenburg",
		hb: "Bremen",
		hh: "Hamburg",
		he: "Hesse",
		mv: "Mecklenburg-Vorpommern",
		ni: "Lower Saxony",
		nw: "North Rhine-Westphalia",
		rp: "Rhineland-Palatinate",
		sl: "Saarland",
		sn: "Saxony",
		st: "Saxony-Anhalt",
		sh: "Schleswig-Holstein",
		th: "Thuringia",
	}[id];
};

export const getLabelName = (id) => {
	return {
		bw: "Ba.-Wü.",
		by: "Bavaria",
		be: "Berlin",
		bb: "Brandenburg",
		hb: "Bremen",
		hh: "Hamburg",
		he: "Hesse",
		mv: "Meck.-Vorp.",
		ni: "Lower Saxony",
		nw: "NRW",
		rp: "Rhineland-P.",
		sl: "Saarland",
		sn: "Saxony",
		st: "Saxony-Anhalt",
		sh: "Schles.-Hol.",
		th: "Thuringia",
	}[id];
};
