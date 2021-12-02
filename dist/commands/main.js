"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "main",
    description: "Configure the main role",
    execute(client, msg, args) {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const MainRole = msg.guild.roles.cache.find((role) => role.name === args[0]);
        return MainRole;
    }
};
