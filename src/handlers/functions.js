const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v8");
const ytdl = require("ytdl-core");
const { AudioPlayerStatus, createAudioResource } = require("@discordjs/voice");

module.exports = {
	play: async function (client, interaction, song) {
		const queue = client.queue.get(interaction.guild.id);

		const resource = createAudioResource(ytdl(song.url), {
			inlineVolume: true,
		});

		queue.player.play(resource);

		queue.connection.subscribe(client.queue.get(interaction.guild.id).player);

		queue.player
			.on(AudioPlayerStatus.Idle, () => {
				queue.songs.shift();

				if (!queue.songs.length) {
					queue.connection.destroy();

					client.queue.delete(interaction.guild.id);

					return interaction.followUp("Music Ended");
				}

				module.exports.play(interaction, queue.songs[0]);
			})
			.on("error", (err) => {
				console.log(err);
				interaction.followUp("An error occured");
				return;
			});

		interaction.followUp(`Start playing: **${song.title}**`);
	},
	shuffleArray: function (array) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle...
		while (currentIndex !== 0) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	},
	registerCommands: async function (client, guildId) {
		// eslint-disable-next-line no-unused-vars
		const commands = client.commands.map(({ run, category, ...data }) => data);

		const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log("Started refreshing application (/) commands.");

				await rest.put(
					Routes.applicationGuildCommands(client.user.id, guildId),
					{ body: commands }
				);

				console.log(
					`Successfully reloaded application (/) commands for ${guildId}`
				);
			} catch (error) {
				console.error(error);
			}
		})();
	},
	formatDate: function (date) {
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: "UTC",
		};
		return new Intl.DateTimeFormat("en-US", options).format(date);
	},
};
