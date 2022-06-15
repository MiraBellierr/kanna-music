const Discord = require("discord.js");

module.exports = {
	name: "stop",
	description: "stop the track player",
	category: "[🎶] music",
	run: async (client, interaction) => {
		const queue = client.player.getQueue(interaction.guild);

		if (!queue) return interaction.reply("No queue found for this server");

		queue.stop();

		interaction.reply("Stopped the music");
	},
};
