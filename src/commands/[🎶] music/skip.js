const Discord = require("discord.js");

module.exports = {
	name: "skip",
	description: "skip to the next track",
	category: "[🎶] music",
	run: async (client, interaction) => {
		const queue = client.player.getQueue(interaction.guild);

		if (!queue) return interaction.reply("No queue found for this server");

		queue.skip();

		interaction.reply("Skipped the current track");
	},
};
