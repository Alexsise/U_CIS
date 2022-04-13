const cl = require("../index.js");

module.exports = {
  name: "messageCreate",
  execute() {
    const client = cl.client;
    client.channels.cache.get("963791132196761620").send("asdadsa");
  },
};
