let games = require("./game.js");
let result = require("./utils/error.js");
const config = require("../data.json");
const { MongoClient } = require("mongodb");

class GameManager {
	constructor(dbConfig) {
		this.games = {};
		this._active = [];
		this._gamesCollectionPromise = this.initDatabase(config.MONGODB);
	}

	async createGame(server, owner, name) {
		let gamesCollection = await this._gamesCollectionPromise;
		if (server in this.games) {
			return new result.UserResult(false, `There is already a game bound to this server! Unbind to resolve!`);
		} else if (await gamesCollection.countDocuments({owner, name}) != 0) {
			return new result.UserResult(false, `You already own a game named ${name}!`)
		} else {
			this.games = Object.assign(this.games, {[server]: new games.Game(id, name, owner)});
			console.log(this.games);
			// this._active.push(id);
			return new result.UserResult(true, `The game ${name} was created successfully!`);
		}
	}

	async loadGame(server, owner, name) {
		if (server in this.games) {
			return new result.UserResult(false, "There is already a game bound to this server! Unbind to resolve!");
		} else {
			let gamesCollection = await this._gamesCollectionPromise;
			let gameDocument = await gamesCollection.findOne({owner, name});
			if (gameDocument) {
				this.games = Object.assign(this.games, {[server]: games.Game.fromDocument(gameDocument)});
				console.log(this.games);
				// this._active.push(id);
				return new result.UserResult(true, `The game ${name} was loaded successfully!`)
			} else {
				return new result.UserResult(false, `You have not created a game named ${name}. Use the newgame command to create it.`)
			}
		}
	}

	async unbind(server) {
		if (!(server in this.games)) {
			return new result.UserResult(false, `This server is not bound to a game!`);
		} else {
			//TODO @Cloostefis, save the game data to database before deleting
			await this.saveGame(this.games[server]);
			// let index = this._active.indexOf(this.games[server].id);
			// if (index > -1) {
			// 	this._active.splice(index, 1);
			// }
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

	async initDatabase(config) {
		this._mongoClient = new MongoClient(config.SERVER);
		await this._mongoClient.connect();
		let db = this._mongoClient.db(config.DATABASE);
		return db.collection("games");
	}

	async saveGame(game) {
		let gamesCollection = await this._gamesCollectionPromise;
		if (game._id === null) {
			await gamesCollection.insertOne(game);
		} else {
			await gamesCollection.replaceOne({_id: game._id}, game);
		}
	}
}

module.exports = new GameManager()
