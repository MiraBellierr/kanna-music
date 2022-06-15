const { registerCommands } = require("../handlers/functions");

module.exports = async (client) => {
	client.user.setPresence({
		activities: [
			{
				name: `${client.guilds.cache.size.toLocaleString()} servers ✨ | Slash Commands!`,
				type: "WATCHING",
			},
		],
		status: "idle",
	});
	console.log(`Hi, ${client.user.username} is now online!`);

	client.guilds.cache.forEach((guild) => {
		registerCommands(client, guild.id);
	});
};
