"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "unlock",
    description: "Unlock the channel you want, following the next name of the channel, the type (member or role) and the role",
    execute(client, msg, args, cleanId) {
        if (msg.member.permissions.has("MANAGE_CHANNELS")) {
            if (args.length === 0)
                return msg.reply("Please provide the data");
            const [roleMember, type, name] = args;
            if (!name) {
                return msg.reply("Please specify which channel you want to unlock");
            }
            else if (!type) {
                return msg.reply("Please specify if is a role or a member");
            }
            else if (!roleMember) {
                return msg.reply("Please specify for which role you want to unlock the channel");
            }
            ;
            let roles;
            const channel = msg.guild.channels.cache.find((channel) => channel.name === name);
            roles = msg.guild.roles.cache.find((r) => r.name === roleMember);
            if (!channel)
                return msg.reply(`The channel ${name} does not exist`);
            if (!roles && type === "role") {
                return msg.reply(`The role ${roleMember} does not exist`);
            }
            else if (!roles && type === "member") {
                roles = cleanId("!", args, msg);
            }
            channel.permissionOverwrites.delete(roles).then((res) => msg.reply("The channel was unlock"));
        }
        else {
            msg.reply("Only the administrators can execute this command");
        }
    }
};
