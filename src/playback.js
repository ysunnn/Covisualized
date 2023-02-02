import { playback, filter, availableDatesForVariable } from "./stores";

let intervalID = null;
let $playback, $filter, $availableDatesForVariable;
const prev = { blocked: false };

export const registerPlayingBlocker = () => {
	const func = (block) => {
		$playback.playingBlockers.set(func, Boolean(block));
		playback.update(value => value);
	};
	return func;
};

export default () => {

	const step = () => {
		const index = $availableDatesForVariable.indexOf($filter.date);
		const newDate = $availableDatesForVariable[index + 1];
		if (newDate) filter.update(old => ({ ...old, date: newDate }));
		else playback.update(old => ({ ...old, play: false }));
	};

	filter.subscribe(value => $filter = value);
	availableDatesForVariable.subscribe(value => $availableDatesForVariable = value);
	playback.subscribe(value => {
		$playback = value;

		const parametersChanged = prev?.play !== value.play || prev?.stepDuration !== value.stepDuration;
		const isBlocked = [...value.playingBlockers.values()].some(blocked => blocked);
		if (parametersChanged || prev.blocked !== isBlocked) {
			clearInterval(intervalID);
			playback.update(old => ({ ...old, playing: false }));

			if (value.play && !isBlocked) {
				playback.update(old => ({ ...old, playing: true }));
				step();
				intervalID = setInterval(step, value.stepDuration);
			}
		}

		prev.play = value.play;
		prev.stepDuration = value.stepDuration;
		prev.blocked = isBlocked;
	});
};
