const Discord = require("discord.js");

module.exports = {
	name: "nowplaying",
	description: "Shows a current track",
	category: "[🎶] music",
	run: async (client, interaction) => {
		const queue = client.player.getQueue(interaction.guild);

		if (!queue) return interaction.reply("No queue found for this server");

		const track = queue.nowPlaying();

		const embed = new Discord.MessageEmbed()
			.setThumbnail(track.thumbnail)
			.setTitle(`<a:kannahype:986635665162768454> Now Playing`)
			.setColor("PURPLE")
			.setDescription(`${track.title}`);

		interaction.reply({ embeds: [embed] });
	},
};
