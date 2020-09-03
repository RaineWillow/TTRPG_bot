const Discord = require("discord.js");
const config = require("./data.json");
const Events = require("./src/bot.js");

const client = new Discord.Client();

const prefix = "!";

client.on("message", function(message) {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;


	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();
	if (command in Events) {
		if (args.length >= Events[command].minArgs) {
			message.reply(Events[command].invoke(args));
		} else {
			message.reply(`Inproper format of command!`);
		}
	}
});

client.login(config.BOT_TOKEN);
