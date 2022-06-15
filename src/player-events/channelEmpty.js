module.exports = (client, queue) => {
	queue.metadata.channel.send(
		"No one is in the voice channel. I will leave now."
	);

	queue.destroy();
};
