"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "unmute",
    description: "Unmute a member of the server",
    execute: async (client, msg, args, MuteRole, MainRole) => {
        if (msg.member?.permissions.has("KICK_MEMBERS") || msg.member?.permissions.has("BAN_MEMBERS")) {
            if (args.length === 0)
                return msg.reply("Please provide an ID");
            const { id } = msg.mentions.users.first();
            let memberMute = msg.guild.members.cache.get(id);
            const sv = await schema_1.default.findOne({ id: String(msg.guild.id) });
            sv.roles.main.forEach((data) => {
                let role = memberMute.roles.cache.get(data);
                if (role && role.id !== MuteRole.id)
                    MainRole.push(role.id);
            });
            if (memberMute.roles.cache.has(MuteRole.id)) {
                if (memberMute) {
                    memberMute.roles.add(MainRole[0]);
                    memberMute.roles.remove(MuteRole.id);
                    console.log(memberMute.roles.cache.entries());
                    msg.channel.send(`The user <@${id}> has been unmuted`);
                }
            }
        }
    }
};
