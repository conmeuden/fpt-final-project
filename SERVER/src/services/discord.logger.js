"use strict";
const path = require("path");
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_ID_CHANEL = process.env.DISCORD_ID_CHANEL;
const { Client, TextChannel, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("discord ready");
});

client.login(DISCORD_TOKEN);

async function log(message) {
  try {
    const channel = await client.channels.fetch(DISCORD_ID_CHANEL);

    if (channel instanceof TextChannel) {
      const timestamp = new Date().toLocaleString();
      const stack = new Error().stack.split("\n");
      const caller = stack[2].trim().split(" ")[1];
      const fileName = path.basename(caller);
      const logMessage = `[${timestamp}] [${fileName}] ${message}`;

      await channel.send(logMessage);
    } else {
      console.error("Kênh không phải là TextChannel.");
    }
  } catch (error) {
    console.error("Lỗi khi gửi log:", error);
  }
}

module.exports = {
  log,
};
