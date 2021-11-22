"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "status",
    description: "Accept or deny a suggestion, to execute this command follow the next arquetype: (deny or accepted), id of the suggest and a reason",
    execute(client, msg, args, StatusEmbed) {
        if (args.length === 0)
            msg.reply("Data do not provide");
        const [status, id, ...rest] = args;
        const reason = rest.join(" ");
        if (isNaN(parseInt(id)))
            return msg.reply(`The id "${id}" is not valid`);
        if (msg.channel.name === "sugerencias") {
            msg.channel.messages.fetch().then((res) => {
                const message = res.find((message) => message.embeds[0]?.title === `Id:\n${id}` && message.author.username === "Helix");
                if (!message) {
                    msg.delete();
                    msg.channel.send(`The id "${id}" does not exist`)
                        .then((res) => {
                        setTimeout(() => {
                            res.delete();
                            return;
                        }, 2000);
                        return;
                    })
                        .catch((err) => {
                        console.log(err);
                    });
                    return;
                }
                ;
                if (status === "deny") {
                    message.edit({
                        embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, reason, "#ff0000", id, msg.author.username)]
                    });
                }
                else if (status === "accepted") {
                    message.edit({
                        embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, reason, "#ffff00", id, msg.author.username)]
                    });
                }
                else {
                    msg.reply("The status is not valid");
                }
            })
                .catch((err) => {
                console.log(err);
            });
            msg.delete();
        }
    }
};