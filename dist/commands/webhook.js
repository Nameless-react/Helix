"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanId_1 = require("../CleanId");
exports.default = {
    name: "webHook",
    description: "Create a webhook, follow the next, the name of the channel you want the webhook to send the messages, the name of the webhook and if you want the image for(the link)",
    execute(client, msg, args) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [nameChannel, name, img] = args;
        const channel = msg.guild.channels.cache.find((channel) => channel.name === nameChannel);
        if (!channel)
            return msg.reply("The channel does not exist");
        CleanId_1.WebHook.edit({
            channel: channel.id
        });
    }
};
