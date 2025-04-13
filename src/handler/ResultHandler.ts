import type ZEngine from "@fukutotojido/z-engine";
import type Test from "../Test"
import IPCClient from "./IPCClient";

const CLIENT_COUNT = 4;
export default class ResultHandler {
	resultContainer: HTMLElement | null;
    isEnded = false;

    clients: IPCClient[];

	constructor(engine: ZEngine, test?: Test) {
		this.resultContainer = document.querySelector("#resultContainer");

		engine.register("menu.bm.time.current", (_, value, data) => {
            if (test?.testMode) return;
			this.updateTime(
				value > data.bm.time.full && data.tourney.manager.bools.scoreVisible,
			);
		});
	}

	updateTime(isEnded: boolean) {
        if (isEnded === this.isEnded) return;
        this.isEnded = isEnded;

        if (this.resultContainer === null) return;
        this.resultContainer.style.opacity = isEnded ? "1" : "0";
    }
}
