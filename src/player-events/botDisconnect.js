module.exports = (client, queue) => {
	queue.metadata.channel.send(`Music ended, I leave the voice channel.`);
};
