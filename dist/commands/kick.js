"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "kick",
    description: "Kick a member of the server",
    execute(client, msg, args, cleanId, prefix) {
        if (msg.member.permissions.has("KICK_MEMBERS")) {
            if (args.length === 0)
                return msg.reply("Please provide an ID");
            const member = cleanId(prefix, args, msg);
            if (member) {
                member.kick()
                    .then((member) => {
                    msg.channel.send(`The user ${member} was kicked`);
                }).catch((err) => msg.channel.reply("I do not have permissions"));
            }
            else {
                msg.channel.send("The user was not found");
            }
        }
        else {
            msg.channel.send("You do not have permissions to execute this command");
        }
    }
};
