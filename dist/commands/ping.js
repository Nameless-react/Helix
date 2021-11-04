"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "ping",
    description: "Calculate the latency of the bot and the API",
    execute(client, msg) {
        msg.reply("Calculating latency...").then((latency) => {
            const ping = latency.createdTimestamp - msg.createdTimestamp;
            latency.edit(`🏓 Pong: ${ping}, API latency: ${client.ws.ping}`);
        });
    }
};
