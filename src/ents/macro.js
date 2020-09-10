class Macro {
	constructor(macro) {
		this.macro = macro;
	}

	edit(macro) {
		this.macro = macro;
	}

	static fromDocument(obj) {
		return new Macro(obj.macro);
	}
}

module.exports = {
	Macro:Macro
}
