"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "webHook",
    description: "Create a webhook, follow the next, the name of the channel you want the webhook to send the messages, the name of the webhook and if you want the image for(the link)",
    execute(client, msg, args) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [nameChannel, name, img] = args;
        const channel = msg.guild.channels.cache.find((channel) => channel.name === nameChannel);
        if (!img) {
            channel.createWebhook(name)
                .then(async (res) => {
                console.log(res);
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    $set: {
                        webHook: res.id
                    }
                });
                msg.reply("Webhook created");
            });
            channel.fetchWebHooks()
                .then((res) => console.log(res));
        }
        else {
            channel.createWebhook(name, {
                avatar: img
            }).then(async (res) => {
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    $set: {
                        webHook: res.id
                    }
                });
                msg.reply("Webhook created");
            });
        }
    }
};
