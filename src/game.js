let result = require("./utils/error.js");

let maps = require("./battlemap/battlemap.js");
let ents = require("./ents/entity.js");

class Game {
	constructor(id, name, owner) {
		this.id = id;
		this.name = name;
		this.owner = owner;

		this.battlemaps = {};

		this.ents = {};
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
			return new result.UserResult(false, `There is no battlemap with name ${name} in this game!`);
		} else {
			delete this.battlemaps[name];
			return new result.UserResult(true, `Battlemap ${name} deleted!`);
		}
	}

	createEntity(name, message) {
		if (name in this.ents) {
			return new result.UserResult(false, `There is already an entity with name ${name} in this game!`);
		} else {
			this.ents = Object.assign(this.ents, {[name]: new ents.Entity(name)});
			console.log(this.ents);
			return new result.UserResult(true, `The entity ${name} was created successfully!`);
		}
	}

	deleteEntity(name, message) {
		if (!(name in this.ents)) {
			return new result.UserResult(false, `There is no entity with name ${name} in this game!`);
		} else {
			delete this.ents[name];
			return new result.UserResult(true, `Entity ${name} deleted!`);
		}
	}

	checkBattlemap(name, message) {
		if (name in this.battlemaps) {
			return new result.UserResult(true, `${name} is in this game!`);
		} else {
			return new result.UserResult(false, `${name} is not in this game!`);
		}
	}

	checkEntity(name, message) {
		if (name in this.ents) {
			return new result.UserResult(true, `${name} is in this game!`);
		} else {
			return new result.UserResult(false, `${name} is not in this game!`);
		}
	}
}

module.exports = {
	Game:Game
}
