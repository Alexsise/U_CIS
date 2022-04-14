module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return;
    await client.channels.cache
      .get("963791132196761620")
      .send("Someone decides to say something");
  },
};
