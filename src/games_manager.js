let games = require("./game.js");

class GameManager {
	constructor() {
		this._games = {};
	}

	createGame(server, id, name) {
		if (server in this._games) {
			return false;
		} else {
			this._games = Object.assign(this._games, {[server]: new games.Game(id, name)});
			console.log(this._games);
			return true;
		}
	}

	getGames() {
		return this._games;
	}
}

module.exports = new GameManager()
