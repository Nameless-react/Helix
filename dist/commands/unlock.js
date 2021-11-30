"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "unlock",
    description: "Unlock the channel you want",
    execute(client, msg, args) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [name, type, role] = args;
        if (!name)
            return msg.reply("Please specify which channel you want to unlock");
        if (!role)
            return msg.reply("Please specify for which role you want to unlock the channel");
        const channel = msg.guild.channels.cache.find((channel) => channel.name === name);
        const roles = msg.guild.roles.cache.find((r) => r.name === role);
        if (!channel)
            return msg.reply(`The channel ${name} does not exist`);
        if (!roles && type !== "role")
            return msg.reply(`The role ${role} does not exist`);
        channel.permissionOverwrites.delete(roles).then((res) => msg.reply("The channel was unlock"));
    }
};
