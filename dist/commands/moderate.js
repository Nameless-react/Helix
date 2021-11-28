"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = __importDefault(require("../DB"));
exports.default = {
    name: "moderate",
    description: "Turn on a mode that filter more the content of the message",
    execute: async (client, msg, args, Mode, AdminRole) => {
        if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"]) || msg.member.roles.cache.has(AdminRole.id) || msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0)
                return msg.reply("Please write true or false to execute this command");
            if (args[0] !== "true" && args[0] !== "false") {
                return msg.reply(`"${args[0]}" is not a mode`);
            }
            if (args[0] === "false") {
                msg.reply("The moderation mode is off");
                msg.channel.setRateLimitPerUser(0);
                return Mode = false;
            }
            if (Mode === true)
                return msg.reply("The mode is already on");
            if (args[0] === "true") {
                msg.reply("The moderation mode is on");
                msg.channel.setRateLimitPerUser(5);
                await DB_1.default().then(async (mongoose) => {
                    try {
                        console.log("Connected to the database");
                    }
                    catch (err) {
                        console.log(err);
                    }
                    finally {
                        mongoose.connection.close();
                    }
                });
                return Mode = true;
            }
            ;
        }
        else {
            msg.reply("Only the administrators can execute this command");
        }
        ;
    }
};
