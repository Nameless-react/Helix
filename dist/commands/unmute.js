"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "unmute",
    description: "Unmute a member of the server",
    execute(client, msg, args, MainRole, MuteRole) {
        if (args.length === 0)
            return msg.reply("Please provide an ID");
        const { id } = msg.mentions.users.first();
        let memberMute = msg.guild.members.cache.get(id);
        if (memberMute.roles.cache.has("902666602598760448")) {
            if (memberMute) {
                memberMute.roles.add(MainRole.id);
                memberMute.roles.remove(MuteRole.id);
                msg.channel.send(`The user <@${id}> has been unmuted`);
            }
        }
    }
};
