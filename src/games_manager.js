let games = require("./game.js");
let error = require("./utils/error.js");

class GameManager {
	constructor() {
		this._games = {};
	}

	createGame(server, id, name) {
		if (server in this._games) {
			return new error.UserError(false, `There is already a game bound to this server! Unbind to resolve!`);
		} else {
			this._games = Object.assign(this._games, {[server]: new games.Game(id, name)});
			console.log(this._games);
			return new error.UserError(true, `The game ${name} was created successfully!`);
		}
	}

	unbind(server) {
		if (!(server in this._games)) {
			return new error.UserError(false, `This server is not bound to a game!`);
		} else {
			//TODO @Cloostefis, save the game data to database before deleting
			delete this._games[server];
			return new error.UserError(true, `Game Unbound from server!`);
		}
	}

	getGames() {
		return this._games;
	}
}

module.exports = new GameManager()
