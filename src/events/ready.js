module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const bot = client.user;
    console.log(`Ready! Logged in as ${bot.tag}`);
  },
};
