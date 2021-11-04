"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "banlist",
    description: "Show the list of persons that are ban",
    execute(client, msg, BanEmbed) {
        let list = [];
        msg.guild.bans.fetch().then((rss) => {
            rss.forEach((bans) => {
                const { username, id } = bans.user;
                list.push({
                    username,
                    id,
                    reason: bans.reason
                });
            });
            if (list.length === 0) {
                msg.reply("The list is empty");
                return;
            }
            ;
            msg.channel.send({
                embeds: [BanEmbed(list)]
            });
        });
    }
};
