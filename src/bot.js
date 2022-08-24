const { Client, Collection, IntentsBitField } = require("discord.js");
const fs = require("fs");
const { Player } = require("discord-player");

const client = new Client({
	allowedMentions: { parse: ["users"] },
	intents: Object.values(IntentsBitField.Flags).filter(
		(intent) => typeof intent === "string"
	),
});

client.commands = new Collection();
client.categories = fs.readdirSync("./src/commands/");
client.player = new Player(client);

["command", "event", "player"].forEach((handler) => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);
