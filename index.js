const fs = require("node:fs");
const path = require("node:path")
const { Client, Intents, Collection } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
  ],
});

client.commands = new Collection();
const commandPath = path.join(__dirname, "commands")
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

const eventPath = path.join(__dirname, "events")
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file)
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file) 
  const command = require(filePath) 
  client.commands.set(command.data.name, command);
}

client.login(token);
