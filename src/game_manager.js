let games = require("./game.js");
let result = require("./utils/error.js");

class GameManager {
	constructor() {
		this.games = {};
		this._active = [];
	}

	createGame(server, owner, id, name) {
		if (server in this.games) {
			return new result.UserResult(false, `There is already a game bound to this server! Unbind to resolve!`);
		} else {
			this.games = Object.assign(this.games, {[server]: new games.Game(id, name, owner)});
			console.log(this.games);
			this._active.push(id);
			return new result.UserResult(true, `The game ${name} was created successfully!`);
		}
	}

	//load(server, gamedata)

	unbind(server) {
		if (!(server in this.games)) {
			return new result.UserResult(false, `This server is not bound to a game!`);
		} else {
			//TODO @Cloostefis, save the game data to database before deleting
			let index = this._active.indexOf(this.games[server].id);
			if (index > -1) {
				this._active.splice(index, 1);
			}
			delete this.games[server];
			return new result.UserResult(true, `Game Unbound from server!`);
		}
	}

	checkGame(server) {
		if (server in this.games) {
			return new result.UserResult(true, "Server Bound!")
		} else {
			return new result.UserResult(false, "This server is not bound to a game!");
		}
	}

	getGames() {
		return this.games;
	}
}

module.exports = new GameManager()
