"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../DB");
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "moderate",
    description: "Turn on a mode that filter more the content of the message",
    execute: async (client, msg, args, AdminRole) => {
        if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]) || msg.member.roles.cache.has(AdminRole.id) || msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0)
                return msg.reply("Please write true or false to execute this command");
            if (args[0] !== "true" && args[0] !== "false") {
                return msg.reply(`"${args[0]}" is not a mode`);
            }
            const sv = await schema_1.default.findOne({ server: msg.guild.name });
            if (sv.mode === false)
                return msg.reply("The mode is already off");
            if (args[0] === "false") {
                msg.reply("The moderation mode is off");
                const sv = await schema_1.default.updateOne({ server: msg.guild.name }, {
                    mode: false
                });
                msg.channel.setRateLimitPerUser(0);
                return msg.guild.id;
            }
            if (sv.mode === true)
                return msg.reply("The mode is already on");
            if (args[0] === "true") {
                msg.reply("The moderation mode is on");
                const sv = await schema_1.default.updateOne({ server: msg.guild.name }, {
                    mode: true
                });
                msg.channel.setRateLimitPerUser(5);
                return msg.guild.id;
            }
            ;
        }
        else {
            msg.reply("Only the administrators can execute this command");
        }
        ;
    }
};
