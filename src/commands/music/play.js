const ytdl = require("ytdl-core");
const yt = require("yt-search");
const { play } = require("../../handlers/functions");
const {
	joinVoiceChannel,
	createAudioPlayer,
	NoSubscriberBehavior,
} = require("@discordjs/voice");

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

		const args = interaction.options.getString("song");
		const voiceChannel = interaction.member.voice.channel;

		if (!voiceChannel)
			return interaction.editReply(
				"You need to be in a voice channel to play music!"
			);

		const permissions = voiceChannel.permissionsFor(client.user);

		if (!permissions.has("CONNECT") || !permissions.has("SPEAK"))
			return interaction.editReply(
				"I need the permissions to join and speak in your voice channel!"
			);

		yt(args, async (err, res) => {
			if (err)
				return interaction.editReply("I didn't found a video with that name");

			const video = res.videos[0];

			const songInfo = await ytdl.getInfo(video.url);

			const song = {
				title: songInfo.videoDetails.title,
				url: songInfo.videoDetails.video_url,
			};

			if (!client.queue.get(interaction.guild.id)) {
				const queueConstruct = {
					textChannel: interaction.channel,
					voiceChannel,
					connection: null,
					player: null,
					songs: [],
					volume: 100,
					playing: true,
				};

				queueConstruct.player = createAudioPlayer({
					behaviors: {
						noSubscriber: NoSubscriberBehavior.Stop,
					},
				});

				queueConstruct.songs.push(song);

				var connection = joinVoiceChannel({
					channelId: voiceChannel.id,
					guildId: interaction.guild.id,
					adapterCreator: interaction.guild.voiceAdapterCreator,
				});

				queueConstruct.connection = connection;

				client.queue.set(interaction.guild.id, queueConstruct);

				try {
					play(client, interaction, song);
				} catch (err) {
					client.queue.delete(interaction.guild.id);

					console.log(err);
					interaction.editReply("An error occured");
				}
			} else {
				client.queue.get(interaction.guild.id).songs.push(song);

				console.log(client.queue.get(interaction.guild.id).songs);

				return interaction.editReply(
					`${song.title} has been added to the queue!`
				);
			}
		});
	},
};
