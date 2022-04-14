module.exports = {
  name: "messageDelete",
  async execute(client, message) {
      return client.channels.cache
        .get("963791132196761620")
        .send("Someone has deleted message");
  },
};
