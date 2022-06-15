module.exports = {
	name: "play",
	description: "play a music",
	category: "[🎶] music",
	options: [
		{
			name: "song",
			description: "song name or url",
			type: 3,
			required: true,
		},
	],
	run: async (client, interaction) => {
		interaction.reply(`<a:loading:986630153104936980> Loading...`);

		const song = interaction.options.getString("song");

		const track = await client.player
			.search(song, {
				requestedBy: interaction.user,
			})
			.then((x) => x.tracks[0]);

		if (!track) return interaction.editReply(`Track **${song}** not found!`);

		if (!client.player.getQueue(interaction.guild)) {
			const queue = client.player.createQueue(interaction.guild, {
				metadata: {
					channel: interaction.channel,
				},
			});

			try {
				if (!queue.connection)
					await queue.connect(interaction.member.voice.channel);
			} catch (err) {
				if (!queue.destroyed) {
					queue.destroy();
				}

				console.log(err);
				return interaction.editReply({
					content: "Could not join your voice channel!",
					ephemeral: true,
				});
			}

			queue.play(track);
		} else {
			const queue = client.player.getQueue(interaction.guild);

			queue.addTrack(track);
		}

		interaction.deleteReply();
	},
};
