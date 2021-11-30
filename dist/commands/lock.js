"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CleanId_1 = require("../CleanId");
exports.default = {
    name: "lock",
    description: "lock a channel to all the members, following the next name of the channel, the type (member or role) and the role",
    execute(client, msg, args, everyone) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [roleMember, type, name] = args;
        if (!name) {
            return msg.reply("Please specify which channel you want to lock");
        }
        else if (!type) {
            return msg.reply("Please specify if is a role or a member");
        }
        else if (!roleMember) {
            return msg.reply("Please specify for which role or person you want to lock the channel");
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
            roles = CleanId_1.cleanId("!", args, msg);
        }
        channel.permissionOverwrites.create(roles, {
            SEND_MESSAGES: false,
        }).then((res) => msg.reply("The channel was lock"));
    }
};
