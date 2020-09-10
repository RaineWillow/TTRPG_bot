class Battlemap {
	constructor(name) {
		this.name = name;
	}

	static fromDocument(obj) {
		return new Battlemap(obj.name);
	}
}

module.exports = {
	Battlemap:Battlemap
}
