"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "moderate",
    description: "Turn on a mode that filter more the content of the message",
    execute(client, msg, args, Mode, AdminRole) {
        if (args.length === 0)
            return msg.reply("Please write true or false to execute this command");
        if (!msg.member.roles.cache.has(AdminRole.id))
            return msg.reply("Only the administrators can execute this command");
        if (args[0] !== "true" && args[0] !== "false") {
            return msg.reply(`"${args[0]}" is not a mode`);
        }
        if (args[0] === "false") {
            msg.reply("The moderation mode is off");
            return Mode = false;
        }
        if (Mode === true)
            return msg.reply("The mode is already on");
        if (args[0] === "true") {
            msg.reply("The moderation mode is on");
            return Mode = true;
        }
        ;
    }
};