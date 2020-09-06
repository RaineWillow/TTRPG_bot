let games = require("./game.js");
let error = require("./utils/error.js");

class GameManager {
	constructor() {
		this._games = {};
		this._active = [];
	}

	createGame(server, id, name) {
		if (server in this._games) {
			return new error.UserError(false, `There is already a game bound to this server! Unbind to resolve!`);
		} else {
			this._games = Object.assign(this._games, {[server]: new games.Game(id, name)});
			this._active.push(id);
			return new error.UserError(true, `The game ${name} was created successfully!`);
		}
	}

	//load(server, gamedata)

	unbind(server) {
		if (!(server in this._games)) {
			return new error.UserError(false, `This server is not bound to a game!`);
		} else {
			//TODO @Cloostefis, save the game data to database before deleting
			let index = this._active.indexOf(this._games[server].id);
			if (index > -1) {
				this._active.splice(index, 1);
			}
			delete this._games[server];
			return new error.UserError(true, `Game Unbound from server!`);
		}
	}

	getGames() {
		return this._games;
	}
}

module.exports = new GameManager()
