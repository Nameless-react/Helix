"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "status",
    description: "Accept or deny a suggestion",
    execute(client, msg, args, StatusEmbed) {
        if (args.length === 0)
            msg.reply("Data do not provide");
        const [status, id, ...rest] = args;
        const reason = rest.join(" ");
        if (msg.channel.name === "sugerencias") {
            msg.channel.messages.fetch().then((res) => {
                const message = res.find((message) => message.embeds[0]?.title === `Id: ${id}` && message.author.username === "Helix");
                console.log(message);
                if (status === "deny") {
                    message.edit({
                        embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, reason, "#ff0000")]
                    });
                }
                else if (status === "accepted") {
                    message.edit({
                        embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.author.displayAvatarURL(), status, reason, "#ffff00")]
                    });
                }
            })
                .catch((err) => {
                console.log(err);
            });
        }
    }
};
