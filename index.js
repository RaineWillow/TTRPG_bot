const Discord = require("discord.js");
const config = require("./data.json");
const Events = require("./src/bot.js");

const client = new Discord.Client();

const prefix = config.PREFIX;

let init = false;
let channel = undefined;

client.on("message", function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;


	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if (channel != undefined) {
		if ((command in Events) && (message.channel.id === channel)) {
			if (args.length >= Events[command].minArgs) {
				message.channel.send(Events[command].invoke(args));
			} else {
				message.channel.send(`Inproper format of command!`);
			}
		}
	} else {
		if (command === "init") {
			channel = message.channel.id;
		}
	}

});

client.login(config.BOT_TOKEN);
