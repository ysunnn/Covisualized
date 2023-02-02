import { csv, timeFormatLocale } from "d3";
import localeDefDe from "d3-time-format/locale/de-DE";

import revenueCSV from "./data/revenue.csv?url";
import employeesCSV from "./data/employees.csv?url";
import incidencesCSV from "./data/incidences.csv?url";
import regulationsCSV from "./data/regulations.csv?url";
import regulationsIndexCSV from "./data/regulations-index.csv?url";

const localeDe = timeFormatLocale(localeDefDe);

function stateNameToID(name) {
	return {
		"baden-württemberg": "bw",
		"baden-wuerttemberg": "bw",
		"bavaria": "by",
		"bayern": "by",
		"berlin": "be",
		"brandenburg": "bb",
		"bremen": "hb",
		"deutschland": "de",
		"hamburg": "hh",
		"hesse": "he",
		"hessen": "he",
		"mecklenburg-vorpommern": "mv",
		"lower saxony": "ni",
		"niedersachsen": "ni",
		"north rhine-westphalia": "nw",
		"nordrhein-westfalen": "nw",
		"rhineland-palatinate": "rp",
		"rheinland-pfalz": "rp",
		"saarland": "sl",
		"saxony": "sn",
		"sachsen": "sn",
		"saxony-anhalt": "st",
		"sachsen-anhalt": "st",
		"schleswig-holstein": "sh",
		"thuringia": "th",
		"thüringen": "th",
		"thueringen": "th",
	}[name.toLowerCase()];
}

function normalizePercentage(value) {
	// Input: value in the format XX.Y% in range [0.0, 100.0]
	// Output: value in the format 0.XXY in range [0.0, 1.0]
	return Math.round(Number(value) * 10) / 1000;
}

// We save the Date as YYYY-MM instead of a Date object, because using an object to index
// our data is a bad idea. We can always convert this by passing it to the Date constructor.
export async function parseRevenue() {
	const data = await csv(revenueCSV);
	return data.map(({ year, month, state, revenue }) => ({
		date: localeDe.utcParse("%Y %B")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: normalizePercentage(revenue),
	}));
}

export async function parseEmployees() {
	const data = await csv(employeesCSV);
	return data.map(({ year, month, state, employees }) => ({
		date: localeDe.utcParse("%Y %B")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: normalizePercentage(employees),
	}));
}

export async function parseIncidences() {
	const data = await csv(incidencesCSV);
	return data.map(({ year, month, state, incidences }) => ({
		date: localeDe.utcParse("%Y %m")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: Number(incidences),
	}));
}

export async function parseRegulations() {
	const data = await csv(regulationsCSV);
	return data.map(({ year, month, state, ...rest }) => {
		const regulations = Object.fromEntries(
			Object.entries(rest).map(([key, value]) => [key, Math.floor(Number(value))]),
		);
		return {
			date: localeDe.utcParse("%Y %m")(`${year} ${month}`).toISOString().slice(0, 7),
			state: stateNameToID(state),
			value: {
				single: regulations,
				total: Object.values(regulations).reduce((total, value) => total + value, 0),
			},
		};
	});
}

export async function parseRegulationsIndex() {
	const data = await csv(regulationsIndexCSV);
	return data.map(({ year, month, state, regulationsIndex }) => ({
		date: localeDe.utcParse("%Y %m")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: Number(regulationsIndex),
	}));
}
