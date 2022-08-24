const Discord = require("discord.js");

module.exports = {
	name: "queue",
	description: "Shows a music queue",
	category: "[🎶] music",
	run: async (client, interaction) => {
		const queue = client.player.getQueue(interaction.guild);

		if (!queue || !queue.tracks.length)
			return interaction.reply("No queue found for this server");

		const tracks = queue.tracks.map(
			(track, index) =>
				`${index + 1} - **${track.title}** \`${track.duration}\``
		);

		const embed = new Discord.EmbedBuilder()
			.setTitle("<a:kannahype:986635665162768454> Queue")
			.setColor(Discord.Colors.Purple)
			.setDescription(
				`Now Playing: **${queue.nowPlaying().title}** \`${
					queue.nowPlaying().duration
				}\`\n\nUp Next:\n${tracks.join("\n")}`
			);

		interaction.reply({ embeds: [embed] });
	},
};
