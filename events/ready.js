const cl = require("../index.js");

module.exports = {
  name: "ready",
  once: true,
  execute() {
    const bot = cl.client.user;
    console.log(`Ready! Logged in as ${bot.tag}`);
  },
};
