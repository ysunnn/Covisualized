import { playback, filter, availableDatesForVariable } from "./stores";

let intervalID = null;
let $filter, $availableDatesForVariable;
filter.subscribe(value => $filter = value);
availableDatesForVariable.subscribe(value => $availableDatesForVariable = value);

export default () => {

	const step = () => {
		const index = $availableDatesForVariable.indexOf($filter.date);
		const newDate = $availableDatesForVariable[index + 1];
		if (newDate) filter.update(old => ({ ...old, date: newDate }));
		else playback.update(old => ({ ...old, playing: false }));
	};

	playback.subscribe(({ playing, stepDuration }) => {
		clearInterval(intervalID);

		if (playing) {
			step();
			intervalID = setInterval(step, stepDuration);
		}
	});
};
