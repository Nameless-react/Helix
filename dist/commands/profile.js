"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "profile",
    description: "Show some data about the specify user or himself",
    execute(client, msg, ProfileEmbed, args) {
        if (args.length === 0) {
            msg.channel.send({
                embeds: [ProfileEmbed(msg.member)]
            });
        }
        else {
            const { id } = msg.mentions.users.first();
            const member = msg.guild.members.cache.get(id);
            console.log(member.user.id);
            console.log(member.joinedTimestamp);
            console.log(member.presence.status);
            msg.channel.send({
                embeds: [ProfileEmbed(member)]
            });
        }
    }
};
