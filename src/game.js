let result = require("./utils/error.js");

let maps = require("./battlemap/battlemap.js");
let ents = require("./ents/entity.js");

class Game {
	constructor(id, name, owner) {
		this.id = id;
		this.name = name;
		this.owner = owner;

		this.battlemaps = {};
	}

	createBattlemap(name, message) {
		if (name in this.battlemaps) {
			return new result.UserResult(false, `There is already a battlemap with name ${name} in this game!`)
		} else {
			this.battlemaps = Object.assign(this.battlemaps, {[name]: new maps.Battlemap(name)});
			console.log(this.battlemaps);
			return new result.UserResult(true, `The battlemap ${name} was created successfully!`);
		}
	}

	deleteBattlemap(name, message) {
		if (!(name in this.battlemaps)) {
			return new result.UserResult(false, `There is no battlemap with name ${name} in the server!`);
		} else {
			delete this.battlemaps[name];
			return new result.UserResult(true, `Battlemap ${name} deleted!`);
		}
	}
}

module.exports = {
	Game:Game
}
