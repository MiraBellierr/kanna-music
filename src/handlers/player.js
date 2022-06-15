const { readdirSync } = require("fs");

module.exports = (client) => {
	const events = readdirSync("./src/player-events/");
	for (const event of events) {
		const file = require(`../player-events/${event}`);
		client.player.on(event.split(".")[0], (...args) => file(client, ...args));
	}
};
