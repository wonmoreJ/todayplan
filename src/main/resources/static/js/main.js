import modalEvents from "./events/modalEvents.js";
import * as planEvents from "./events/planEvents.js";

document.addEventListener("DOMContentLoaded", () => {
	modalEvents();
	planEvents.planEvents();
});