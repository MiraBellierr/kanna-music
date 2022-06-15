const Discord = require("discord.js");

module.exports = (client, queue, track) => {
	const embed = new Discord.MessageEmbed()
		.setThumbnail(track.thumbnail)
		.setTitle(`<a:kannahype:986635665162768454> Now Playing`)
		.setColor("PURPLE")
		.setDescription(`${track.title}`)
		.setFooter({ text: `Requested by: ${track.requestedBy.username}` });

	queue.metadata.channel.send({ embeds: [embed] });
};
