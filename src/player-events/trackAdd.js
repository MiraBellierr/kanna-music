const Discord = require("discord.js");

module.exports = (client, queue, track) => {
	const embed = new Discord.MessageEmbed()
		.setThumbnail(track.thumbnail)
		.setTitle(`<a:kannahype:986635665162768454> Added to queue`)
		.setColor("PURPLE")
		.setDescription(`${track.title}`);

	queue.metadata.channel.send({ embeds: [embed] });
};
