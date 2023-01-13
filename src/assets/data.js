import { csv, timeFormatLocale } from "d3";
import localeDefDe from "d3-time-format/locale/de-DE";

import revenuePerStateCSV from "./data/revenue.csv?url";

import employeesPerStateCSV from "./data/employees.csv?url";

const localeDe = timeFormatLocale(localeDefDe);

function stateNameToID(name) {
	return {
		"baden-württemberg": "bw",
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
	}[name.toLowerCase()];
}

function normalizePercentage(value) {
	// Input: value in the format XX.Y% in range [0.0, 100.0]
	// Output: value in the format 0.XXY in range [0.0, 1.0]
	return Math.round(Number(value) * 10) / 1000;
}

export async function parseRevenue() {
	const data = await csv(revenuePerStateCSV);
	return data.map(({ year, month, state, revenue }) => ({
		// We save the Date as YYYY-MM instead of a Date object, because using an object to index
		// our data is a bad idea. We can always convert this by passing it to the Date constructor.
		date: localeDe.utcParse("%Y %B")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: normalizePercentage(revenue),
	}));
}

export async function parseEmployees() {
	const data = await csv(employeesPerStateCSV);
	return data.map(({ year, month, state, employees }) => ({
		// We save the Date as YYYY-MM instead of a Date object, because using an object to index
		// our data is a bad idea. We can always convert this by passing it to the Date constructor.
		date: localeDe.utcParse("%Y %B")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: normalizePercentage(employees),
	}));
}
