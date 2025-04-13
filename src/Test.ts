import type BeatmapHandler from "./handler/BeatmapHandler";
import type ChatHandler from "./handler/ChatHandler";
import type GameStateHandler from "./handler/GameStateHandler";
import type ScoreHandler from "./handler/ScoreHandler";
import type TeamHandler from "./handler/TeamHandler";

export default class Test {
	testMode = false;
	beatmapHandler?: BeatmapHandler;
	chatHandler?: ChatHandler;
	teamHandler?: TeamHandler;
	scoreHandler?: ScoreHandler;
	gameStateHandler?: GameStateHandler;

	constructor() {
		const instance = this;

		(document.querySelector("#testMode") as HTMLInputElement).onclick =
			function () {
				instance.testMode = (this as HTMLInputElement).checked;
			};

		(document.querySelector("#testScoreVisible") as HTMLInputElement).onclick =
			function () {
				instance.testScoreVisible((this as HTMLInputElement).checked);
			};

		(document.querySelector("#testStarsVisible") as HTMLInputElement).onclick =
			function () {
				instance.testStarsVisible((this as HTMLInputElement).checked);
			};

		(document.querySelector("#testScoreLeft") as HTMLInputElement).onblur =
			() => this.testScore();
		(document.querySelector("#testScoreLeft") as HTMLInputElement).onchange =
			() => this.testScore();

		(document.querySelector("#testScoreRight") as HTMLInputElement).onblur =
			() => this.testScore();
		(document.querySelector("#testScoreRight") as HTMLInputElement).onchange =
			() => this.testScore();
	}

	assign({
		beatmapHandler,
		chatHandler,
		teamHandler,
		scoreHandler,
		gameStateHandler,
	}: {
		beatmapHandler: BeatmapHandler;
		chatHandler: ChatHandler;
		teamHandler: TeamHandler;
		scoreHandler: ScoreHandler;
		gameStateHandler: GameStateHandler;
	}) {
		this.beatmapHandler = beatmapHandler;
		this.chatHandler = chatHandler;
		this.teamHandler = teamHandler;
		this.scoreHandler = scoreHandler;
		this.gameStateHandler = gameStateHandler;
	}

	testScore() {
		if (!this.testMode) return;

		const scoreLeft = Number(
			(document.querySelector("#testScoreLeft") as HTMLInputElement).value,
		);
		const scoreRight = Number(
			(document.querySelector("#testScoreRight") as HTMLInputElement).value,
		);

		this.scoreHandler?.updateScore(scoreLeft, scoreRight);
	}

	testScoreVisible(scoreVisible: boolean) {
		if (!this.testMode) return;
		this.gameStateHandler?.updateScoreVisible(scoreVisible);
	}

	testStarsVisible(starsVisible: boolean) {
		if (!this.testMode) return;
		this.gameStateHandler?.updateStarsVisible(starsVisible);
	}
}
