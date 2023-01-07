import { csv, timeFormatLocale } from "d3";
import localeDefDe from "d3-time-format/locale/de-DE";

import revenuePerStateCSV from "./data/revenue.csv?url";

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

export async function parseRevenue() {
	const data = await csv(revenuePerStateCSV);
	return data.map(({ year, month, state, revenue }) => ({
		// We save the Date as YYYY-MM instead of a Date object, because using an object to index
		// our data is a bad idea. We can always convert this by passing it to the Date constructor.
		date: localeDe.utcParse("%Y %B")(`${year} ${month}`).toISOString().slice(0, 7),
		state: stateNameToID(state),
		value: Math.round(Number(revenue) * 10) / 1000,
	}));
}
