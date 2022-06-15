module.exports = {
	name: "invite",
	description: "Bot invite link",
	category: "[✨] utility",
	run: async (client, interaction) => {
		interaction.reply(
			"https://discord.com/api/oauth2/authorize?client_id=986547125062078524&permissions=0&scope=bot%20applications.commands"
		);
	},
};
