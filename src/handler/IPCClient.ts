import type ZEngine from "@fukutotojido/z-engine";

export default class IPCClient {
	idx: number;
	engine: ZEngine;
	callbacks: {
		key: string,
		callback: (key: string, value: string | number) => void
	}[] = [];

	team = "";
	name = "";
	score = 0;
	accuracy = 0;
	maxCombo = 0;
	h0 = 0;
	h50 = 0;
	h100 = 0;
	h300 = 0;
	grade = "SS";
	UR = 0;
	mods = 0;

	static VALUE_MAP = [
		["team", "team"],
		["play.playerName", "name"],
		["play.score", "score"],
		["play.accuracy", "accuracy"],
		["play.combo.max", "maxCombo"],
		["play.hits.0", "h0"],
		["play.hits.50", "h50"],
		["play.hits.100", "h100"],
		["play.hits.300", "h300"],
		["play.rank.current", "grade"],
		["play.unstableRate", "UR"],
		["play.mods.number", "mods"]
	]

	constructor(engine: ZEngine, idx: number) {
		this.engine = engine;
		this.idx = idx;

		this.callbacks = IPCClient.VALUE_MAP.map(([ key, id ]) => {
			// biome-ignore lint/suspicious/noExplicitAny: Var unused
			const callback = (_: any, newValue: string | number) => this.updateValue(id, newValue);
			engine.register(`tourney.clients.${this.idx}.${key}`, callback);
			
			return {
				key,
				callback
			}
		})
	}

	destruct() {
		for (const { key, callback } of this.callbacks) {
			this.engine.unregister(key, callback);
		}
	}

	updateValue(key: string, value: string | number) {
		// @ts-ignore
		this[key] = value;
	}
}
