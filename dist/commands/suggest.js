"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "suggest",
    description: "Make a suggestion",
    execute(client, msg, suggesEmbed, args) {
        if (args.length === 0)
            return msg.reply("No suggestion was provided");
        const content = args.join(" ");
        const suggestions = msg.guild.channels.cache.find((channel) => channel.name.match(/sugerencias?|suggestions?/ig));
        msg.delete().then((res) => {
            suggestions.send({
                embeds: [suggesEmbed(content, msg.author.username, msg.author.displayAvatarURL(), msg)]
            });
        });
    }
};
