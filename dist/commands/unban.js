"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "unban",
    description: "Unban the users",
    execute(client, msg, args) {
        if (args.length === 0)
            return msg.reply("Please provide an ID");
        msg.guild.members.unban(args[0])
            .then((member) => {
            msg.channel.send(`The user ${args[0]} was unbanned`);
        }).catch((err) => msg.channel.send("The user was not found"));
    }
};
