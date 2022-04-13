const fs = require("node:fs");
const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
module.exports = { client };

client.commands = new Collection();
const commandFIles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

for (const file of commandFIles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.login(token);
