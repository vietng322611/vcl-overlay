import type ZEngine from "@fukutotojido/z-engine";
import type { Data } from "@fukutotojido/z-engine";
import { CountUp, type CountUpOptions } from "countup.js";
import type Test from "../Test";

export default class ScoreHandler {
	scoreLeftElement: HTMLElement | null;
	scoreRightElement: HTMLElement | null;
	barLeftElement: HTMLElement | null;
	barLeftContainerElement: HTMLElement | null;
	barRightElement: HTMLElement | null;
	barRightContainerElement: HTMLElement | null;
	countUpLeft: CountUp;
	countUpRight: CountUp;

	constructor(engine: ZEngine, test?: Test) {
		this.scoreLeftElement = document.querySelector("#scoreLeft");
		this.scoreRightElement = document.querySelector("#scoreRight");
		this.barLeftContainerElement = document.querySelector("#barLeftContainer");
		this.barLeftElement = document.querySelector("#barLeft");
		this.barRightContainerElement =
			document.querySelector("#barRightContainer");
		this.barRightElement = document.querySelector("#barRight");

		const options: CountUpOptions = {
			duration: 0.5,
			useEasing: false,
			onCompleteCallback: () => this.onComplete(),
		};
		this.countUpLeft = new CountUp(
			this.scoreLeftElement ?? "#scoreLeft",
			0,
			options,
		);
		this.countUpRight = new CountUp(
			this.scoreRightElement ?? "#scoreRight",
			0,
			options,
		);

		// biome-ignore lint/suspicious/noExplicitAny: Bro the value is ambiguous
		const update = (_: any, __: any, data: Data) => {
			if (test?.testMode) return;
			this.updateScore(
				data.tourney.manager.gameplay.score.left,
				data.tourney.manager.gameplay.score.right,
			);
		};
		engine.register("tourney.manager.gameplay.score.left", update);
		engine.register("tourney.manager.gameplay.score.right", update);
	}

	onComplete() {
		if (
			!this.barLeftContainerElement ||
			!this.barRightContainerElement ||
			!this.scoreLeftElement ||
			!this.scoreRightElement
		)
			return;

		this.barLeftContainerElement.style.minWidth = `calc(${
			getComputedStyle(this.scoreLeftElement).width
		} / 2)`;
		this.barRightContainerElement.style.minWidth = `calc(${
			getComputedStyle(this.scoreRightElement).width
		} / 2)`;
	}

	updateScore(scoreLeft: number, scoreRight: number) {
		const difference = scoreLeft - scoreRight;
		const lineDiffFactor = Math.min(
			0.4,
			(Math.abs(difference) / 1500000) ** 0.5 / 2,
		);

		if (
			!this.barLeftElement ||
			!this.barLeftContainerElement ||
			!this.barRightElement ||
			!this.barRightContainerElement ||
			!this.scoreLeftElement ||
			!this.scoreRightElement
		)
			return;

		// this.scoreLeftElement.innerText = String(scoreLeft);
		// this.scoreRightElement.innerText = String(scoreRight);
		this.countUpLeft.update(scoreLeft);
		this.countUpRight.update(scoreRight);

		this.barLeftContainerElement.style.minWidth = `calc(${
			getComputedStyle(this.scoreLeftElement).width
		} / 2)`;
		this.barRightContainerElement.style.minWidth = `calc(${
			getComputedStyle(this.scoreRightElement).width
		} / 2)`;

		this.barLeftElement.style.width =
			difference > 0 ? `calc(${Math.min(1, lineDiffFactor)} * 960px)` : "0px";
		this.barRightElement.style.width =
			difference < 0 ? `calc(${Math.min(1, lineDiffFactor)} * 960px)` : "0px";
	}
}
