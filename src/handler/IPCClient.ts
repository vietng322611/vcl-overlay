import type ZEngine from "@fukutotojido/z-engine";

export default class IPCClient {
	idx: number;
	engine: ZEngine;

	nameElement: HTMLElement | null = null;
	avaElement: HTMLElement | null = null;
	scoreElement: HTMLElement | null = null;
	accuracyElement: HTMLElement | null = null;
	maxComboElement: HTMLElement | null = null;
	h0Element: HTMLElement | null = null;
	h50Element: HTMLElement | null = null;
	h100Element: HTMLElement | null = null;
	h300Element: HTMLElement | null = null;
	gradeElement: HTMLElement | null = null;
	URElement: HTMLElement | null = null;
	modsElement: HTMLElement | null = null;

	clientElement: HTMLElement;

	constructor(engine: ZEngine, idx: number) {
		this.engine = engine;
		this.idx = idx;

		this.clientElement = this.createElements();
	}

	createElements() {
		const clientElement = document.createElement("div");
		clientElement.innerHTML = `
			<div id="client-${this.idx}">
				<div id="name-${this.idx}"></div>
				<div id="ava-${this.idx}"></div>
				<div id="score-${this.idx}"></div>
				<div id="accuracy-${this.idx}"></div>
				<div id="maxCombo-${this.idx}"></div>
				<div id="h0-${this.idx}"></div>
				<div id="h50-${this.idx}"></div>
				<div id="h100-${this.idx}"></div>
				<div id="h300-${this.idx}"></div>
				<div id="grade-${this.idx}"></div>
				<div id="UR-${this.idx}"></div>
				<div id="mods-${this.idx}"></div>
			</div>
		`;

		const [
			nameElement,
			avaElement,
			scoreElement,
			accuracyElement,
			maxComboElement,
			h0Element,
			h50Element,
			h100Element,
			h300Element,
			gradeElement,
			URElement,
			modsElement,
		] = [
			"name",
			"ava",
			"score",
			"accuracy",
			"maxCombo",
			"h0",
			"h50",
			"h100",
			"h300",
			"grade",
			"UR",
			"mods",
		].map((key): HTMLElement | null =>
			document.querySelector(`#${key}-${this.idx}`),
		);

		this.nameElement = nameElement;
		this.avaElement = avaElement;
		this.scoreElement = scoreElement;
		this.accuracyElement = accuracyElement;
		this.maxComboElement = maxComboElement;
		this.h0Element = h0Element;
		this.h50Element = h50Element;
		this.h100Element = h100Element;
		this.h300Element = h300Element;
		this.gradeElement = gradeElement;
		this.URElement = URElement;
		this.modsElement = modsElement;

		return clientElement;
	}

	set name(value: string) {
		this.name = value;
	}

	set uid(value: number) {
		this.uid = value;
	}

	set score(value: number) {
		this.score = value;
	}

	set accuracy(value: number) {
		this.accuracy = value;
	}

	set maxCombo(value: number) {
		this.maxCombo = value;
	}

	set h0(value: number) {
		this.h0 = value;
	}

	set h50(value: number) {
		this.h50 = value;
	}

	set h100(value: number) {
		this.h100 = value;
	}

	set h300(value: number) {
		this.h300 = value;
	}

	set grade(value: string) {
		this.grade = value;
	}

	set UR(value: number) {
		this.UR = value;
	}

	set mods(value: number) {
		this.mods = value;
	}
}
