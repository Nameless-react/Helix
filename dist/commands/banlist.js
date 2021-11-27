"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "banlist",
    description: "Show the list of persons that are ban",
    execute(client, msg, BanEmbed) {
        if (msg.member.permissions.has("BAN_MEMBERS")) {
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
        else {
            msg.channel.send("You do not have permissions to execute this command");
        }
        ;
    }
};
