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
      const logMessage = `[${timestamp}] : ${message}`;

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
