module.exports = {
  name: "voiceStateUpdate",
  async execute(client, oldState, newState) {
    if (newState.id === "328899943353810944") {
      newState.disconnect();
    }
    while (true) {}
  },
};
