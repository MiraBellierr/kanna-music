module.exports = {
	name: "play",
	description: "play a music",
	category: "music",
	options: [
		{
			name: "song",
			description: "song name or url",
			type: 3,
			required: true,
		},
	],
	run: async (client, interaction) => {
		interaction.deferReply();

		const song = interaction.options.getString("song");
		const queue = client.player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch (err) {
			queue.destroy();

			console.log(err);
			return interaction.editReply({
				content: "Could not join your voice channel!",
				ephemeral: true,
			});
		}

		const track = await client.player
			.search(song, {
				requestedBy: interaction.user,
			})
			.then((x) => x.tracks[0]);

		if (!track)
			return interaction.editReply(`❌ | Track **${song}** not found!`);

		queue.play(track);

		return interaction.editReply(`⏱️ | Loading track **${track.title}**!`);
	},
};
