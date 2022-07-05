const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  intents: 591,
  presence: {
    status: "online",
  },
});

//#region Command handling
client.commands = new Collection();
const commandPath = path.join(__dirname, "commands");

//Чтение файлов с командами в массив
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);

  //Вытаскивание файлов с командами для деплоя в Коллекцию клиент
  const command = require(filePath);

  //Деплой команд внутрь работчющего клитента
  client.commands.set(command.data.name, command);
}
//#endregion

//#region Events handling
const eventPath = path.join(__dirname, "events");

//Чтение файлов с событиями в массив
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);

  //Занос ивентов внутрь соответсвующих слушателей .on() и .once() внутри клиента
  if (event.once) {
    client.once(event.name, (...args) => event.execute(client, ...args));
  } else {
    client.on(event.name, (...args) => event.execute(client, ...args));
  }
}
//#endregion

client.login(process.env.TOKEN);
