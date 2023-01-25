import "./app.css";
import App from "./App.svelte";
import playback from "./playback";

const app = new App({
	target: document.getElementById("app"),
});
playback();

export default app;
