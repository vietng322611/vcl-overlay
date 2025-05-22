import type ZEngine from "@fukutotojido/z-engine";
import type Test from "../Test";

export default class BeatmapHandler {
	redPickedMaps: Set<Number> = new Set();
	bluePickedMaps: Set<Number> = new Set();
	currentMapId: number = -1;

	static map = [
		{
			id: "artist",
			key: "menu.bm.metadata.artist",
		},
		{
			id: "title",
			key: "menu.bm.metadata.title",
		},
		{
			id: "difficulty",
			key: "menu.bm.metadata.difficulty",
		},
		{
			id: "mapper",
			key: "menu.bm.metadata.mapper",
		},
		{
			id: "CS",
			key: "menu.bm.stats.CS",
		},
		{
			id: "AR",
			key: "menu.bm.stats.AR",
		},
		{
			id: "OD",
			key: "menu.bm.stats.OD",
		},
		{
			id: "BPM",
			key: "menu.bm.stats.BPM.common",
		},
		{
			id: "SR",
			key: "menu.bm.stats.fullSR",
		},
		{
			id: "length",
			key: "menu.bm.time.full",
		},
		{
			id: "metadata",
			key: "menu.bm.path.full",
		},
		{
			id: "picker",
			key: "menu.bm.id",
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

	public async updatePicker(mapId?: number, action: number = 1) {
		// 1: change, 2: remove, 3: add red, 4: add blue
		const element: HTMLElement | null = document.querySelector(`#picker`,);
		if (element === null) return;
		if (action === 2) {
			this.redPickedMaps.delete(mapId!);
			this.bluePickedMaps.delete(mapId!);
		}
		if (action === 3) {
			this.redPickedMaps.add(mapId!);
			this.bluePickedMaps.delete(mapId!);
		}
		if (action === 4) {
			this.bluePickedMaps.add(mapId!);
			this.redPickedMaps.delete(mapId!);
		}
		if (this.redPickedMaps.has(this.currentMapId)) {
			element.innerHTML = `<span style="writing-mode: vertical-lr; text-orientation: upright;">PICK</span>`;
			element.style.width = "28px";
			element.style.color = "white";
			element.style.backgroundColor = "var(--color-red)";
			return;
		}
		if (this.bluePickedMaps.has(this.currentMapId)) {
			element.innerHTML = `<span style="writing-mode: vertical-lr; text-orientation: upright;">PICK</span>`;
			element.style.width = "28px";
			element.style.color = "white";
			element.style.backgroundColor = "var(--color-blue)";
			return;
		}
		element.innerHTML = "";
		element.style.width = "0px";
		element.style.color = "";
	}

	private toMinutes(miliseconds: number) {
		const seconds = Math.round(miliseconds / 1000);
		const minutes = Math.floor(seconds / 60);

		return `${minutes.toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
	}
}
