import { format } from "d3";
import profiles from "./assets/profiles/index.js";
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

export const round = (value, decimals = 0) => Math.round(value * 10 ** decimals) / 10 ** decimals;

export const stateIDs = [
	"bw", "by", "be", "bb", "hb", "hh", "he", "mv",
	"ni", "nw", "rp", "sl", "sn", "st", "sh", "th",
];

export const variables = [{
	id: "revenue",
	label: "Revenue",
	icon: "currency-eur",
	color: "primary",
	desc: "Revenue",
	details: "Relative values based on 2015 (2015 = 100%)",
},
{
	id: "employees",
	label: "Employees",
	icon: "badge-account",
	color: "primary",
	desc: "Number of Employees",
	details: "Relative values based on 2015 (2015 = 100%)",
},
{
	id: "incidences",
	label: "COVID-19 Cases",
	icon: "virus",
	color: "covid",
	desc: "Avg. 7 day incidence",
	details: "Based on cumulative number of reported cases",
}];

export const getStateFlag = (id) => {
	return flags[id];
};

export const getProfilePicture = (id) => {
	return profiles[id];
};

export const getStateName = (id, short = false) => {
	return {
		bw: ["Baden-Württemberg", "Baden-Wü."],
		by: ["Bavaria", "Bavaria"],
		be: ["Berlin", "Berlin"],
		bb: ["Brandenburg", "Brandenburg"],
		hb: ["Bremen", "Bremen"],
		hh: ["Hamburg", "Hamburg"],
		he: ["Hesse", "Hesse"],
		mv: ["Mecklenburg-Vorpommern", "Meck.-Vorp."],
		ni: ["Lower Saxony", "Lw. Saxony"],
		nw: ["North Rhine-Westphalia", "NRW"],
		rp: ["Rhineland-Palatinate", "Rhinel.-P."],
		sl: ["Saarland", "Saarland"],
		sn: ["Saxony", "Saxony"],
		st: ["Saxony-Anhalt", "Saxony-Anh."],
		sh: ["Schleswig-Holstein", "Schles.-Hol."],
		th: ["Thuringia", "Thuringia"],
		de: ["Germany", "Germany"],
	}[id]?.[Number(short)];
};

export const getStateNameShort = (id) => {
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
		de: "Germany",
	}[id];
};

const formatters = {
	revenue: [format(".1%"), format(".0%")],
	employees: [format(".1%"), format(".0%")],
	incidences: [format(",.1f"), value => Math.abs(value) < 10 ? String(value) : format(".2s")(value)],
	regulationsIndex: [format(".1f"), format(".1f")],
};
export const formatValue = (value, type, compact = false) => formatters[type][Number(compact)]?.(value);
