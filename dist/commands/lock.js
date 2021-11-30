"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "lock",
    description: "lock a channel to all the members, following the next name of the channel and the role",
    execute(client, msg, args, everyone) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [name, type, role] = args;
        if (!name) {
            return msg.reply("Please specify which channel you want to unlock");
        }
        else if (!type) {
            return msg.reply("Please specify if is a role or a member");
        }
        else if (!role) {
            return msg.reply("Please specify for which role you want to unlock the channel");
        }
        const channel = msg.guild.channels.cache.find((channel) => channel.name === name);
        const roles = msg.guild.roles.cache.find((r) => r.name === role);
        if (!channel)
            return msg.reply(`The channel ${name} does not exist`);
        if (!roles && type !== "role")
            return msg.reply(`The role ${role} does not exist`);
        channel.permissionOverwrites.create(roles, {
            SEND_MESSAGES: false,
        }).then((res) => msg.reply("The channel was lock"));
    }
};
