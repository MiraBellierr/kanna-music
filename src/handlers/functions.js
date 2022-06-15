const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v8");

module.exports = {
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
