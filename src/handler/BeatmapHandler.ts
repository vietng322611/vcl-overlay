import axios from "axios";
import type ZEngine from "@fukutotojido/z-engine";
import type Test from "../Test";
import type { BeatmapStats } from "../types";

export enum Mods {
    NONE = 0,
    NF = 1,
    EZ = 2,
    HD = 8,
    HR = 16,
    DT = 64,
    RX = 128,
    HT = 256,
    AP = 8192
}

export enum PickAction {
	PICK_RED = 0,
	PICK_BLUE = 1,
	REMOVE_PICK = 2,
}

export default class BeatmapHandler {
	redPickedMaps: Map<Number, Mods> = new Map();
	bluePickedMaps: Map<Number, Mods> = new Map();
	currentMapId: number = -1;
	lastStatUpdateMap: number = -1

	static map = [
		{
			id: "artist",
			key: "beatmap.artist",
		},
		{
			id: "title",
			key: "beatmap.title",
		},
		{
			id: "difficulty",
			key: "beatmap.difficulty",
		},
		{
			id: "mapper",
			key: "beatmap.mapper",
		},
		{
			id: "CS",
			key: "beatmap.stats.cs.converted",
		},
		{
			id: "AR",
			key: "beatmap.stats.ar.converted",
		},
		{
			id: "OD",
			key: "beatmap.stats.od.converted",
		},
		{
			id: "BPM",
			key: "beatmap.stats.bpm.common",
		},
		{
			id: "SR",
			key: "beatmap.stats.stars.total",
		},
		{
			id: "length",
			key: "beatmap.time.lastObject",
		},
		{
			id: "metadata",
			key: "directPath.beatmapBackground",
		},
		{
			id: "picker",
			key: "beatmap.id",
		},
	];

	constructor(engine: ZEngine, test?: Test) {
		for (const value of BeatmapHandler.map) {
			const element: HTMLElement | null = document.querySelector(
				`#${value.id}`,
			);

			engine.register(value.key, (_, newValue) => {
				if (element === null) return;
				switch (value.id) {
					case "CS":
					case "AR":
					case "OD": {
						if (typeof newValue !== "number") break;
						element.innerText = newValue.toFixed(1);
						break;
					}
					case "SR": {
						if (typeof newValue !== "number") break;
						element.innerText = newValue.toFixed(2);
						break;
					}
					case "length": {
						if (typeof newValue !== "number") break;
						element.innerText = this.toMinutes(newValue);
						break;
					}
					case "metadata": {
						element.style.backgroundImage = `url("http://127.0.0.1:24050/Songs/${encodeURIComponent(newValue)}")`;
						break;
					}
					case "picker": {
						if (typeof newValue !== "number") break;
						this.currentMapId = newValue;
						this.updatePicker();
						break;
					}
					default: {
						element.innerText = newValue;
						break;
					}
				}
			});
		}
	}

	public updatePickedMaps(mapId: number, mod: Mods, action: number) {
		switch (action) {
			case PickAction.REMOVE_PICK: {
				this.redPickedMaps.delete(mapId);
				this.bluePickedMaps.delete(mapId);
				break;
			}
			case PickAction.PICK_RED: {
				this.redPickedMaps.set(mapId, mod);
				this.bluePickedMaps.delete(mapId);
				break;
			}
			case PickAction.PICK_BLUE: {
				this.bluePickedMaps.set(mapId, mod);
				this.redPickedMaps.delete(mapId);
				break;
			}
		}
		this.updatePicker();
	}

	private updatePicker() {
		const element: HTMLElement | null = document.querySelector(`#picker`,);
		if (element === null) return;

		const hasRed = this.redPickedMaps.get(this.currentMapId);
		const hasBlue = this.bluePickedMaps.get(this.currentMapId);

		if (hasRed !== undefined || hasBlue !== undefined) {
			if (hasRed !== undefined) this.updateMapStats(hasRed);
			if (hasBlue !== undefined) this.updateMapStats(hasBlue);

			element.innerHTML = `<span style="writing-mode: vertical-lr; text-orientation: upright;">PICK</span>`;
			element.style.width = "28px";
			element.style.color = "white";
			element.style.backgroundColor = (hasRed !== undefined) ? "var(--color-red)" : "var(--color-blue)";
			return;
		}
		element.innerHTML = "";
		element.style.width = "0px";
		element.style.color = "";
	}

	private async updateMapStats(mod: Mods) {
		if (this.currentMapId === this.lastStatUpdateMap) return;
		this.lastStatUpdateMap = this.currentMapId

		if (mod === Mods.NONE) return;
		let allEle = ["CS", "AR", "OD", "SR", "BPM", "length"]
		let stats: BeatmapStats = (await axios.get(`http://127.0.0.1:24050/api/calculate/pp?mods=${mod}`)).data["difficulty"];
		for (const value of allEle) {
			const element: HTMLElement | null = document.querySelector(
				`#${value}`,
			);
			if (element === null) return;
			switch (value) {
				case "CS":
					let cs = parseInt(element.innerText);
					switch (mod) {
						case Mods.EZ:
							cs /= 2;
							break;
						case Mods.HR:
							cs = Math.min(cs*1.3, 10);
							break;
					}
					element.innerText = cs.toFixed(1).toString();
					break;
				case "AR":
					element.innerText = stats.ar.toFixed(1).toString();
					break;
				case "OD":
					element.innerText = stats.od.toFixed(1).toString();
					break;
				case "SR":
					element.innerText = stats.stars.toFixed(2).toString();
					break;
				case "BPM":
					let bpm = parseFloat(element.innerText)
					if (mod === Mods.DT)
						element.innerHTML = (bpm * 1.5).toString()
					break;
				case "length":
					let ms = this.toMs(element.innerText);
					if (mod === Mods.DT) ms /= 1.5;
					else ms /= 0.75;
					element.innerText = this.toMinutes(ms);
					break;
			}
		}
	}

	private toMinutes(miliseconds: number) {
		const seconds = Math.round(miliseconds / 1000);
		const minutes = Math.floor(seconds / 60);

		return `${minutes.toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
	}

	private toMs(minutes: string): number {
		let time: number[] = [];
		minutes.split(":").forEach(value => {
			time.push(parseInt(value));
		});
		return time[0] * 60000 + time[1] * 1000;
	}
}
