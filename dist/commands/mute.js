"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "mute",
    description: "Mute a member, follow the next archetype: the member and the time in seconds(s), minutes(m), hours(h) or days",
    execute: async (client, msg, args, ms, MuteRole) => {
        if (msg.member?.permissions.has("KICK_MEMBER") || msg.member?.permissions.has("BAN_MEMBER"))
            if (args.length === 0)
                return msg.reply("Please provide an ID");
        const { id } = msg.mentions.users.first();
        let memberMute = msg.guild.members.cache.get(id);
        const sv = await schema_1.default.findOne({ id: String(msg.guild.id) });
        let MainRole = [];
        sv.roles.main.forEach((data) => {
            let role = memberMute.roles.cache.get(data);
            if (role && role.id !== MuteRole.id)
                MainRole.push(role.id);
        });
        console.log(memberMute.roles.cache.hasAll(sv.roles.main));
        if (!memberMute.roles.cache.has(sv.roles.main))
            return;
        if (!memberMute.roles.cache.has(MuteRole.id)) {
            if (memberMute) {
                let time;
                if (!args[1]) {
                    time = 600000;
                    memberMute.roles.remove(MainRole[0]);
                    memberMute.roles.add(MuteRole.id);
                    msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                    setTimeout(() => {
                        if (memberMute.roles.cache.has(MainRole[0]))
                            return;
                        memberMute.roles.remove(MuteRole.id);
                        memberMute.roles.add(MainRole[0]);
                    }, time);
                    return;
                }
                ;
                memberMute.roles.remove(MainRole[0]);
                memberMute.roles.add(MuteRole.id);
                time = ms(args[1]);
                if (!time) {
                    time = 600000;
                }
                ;
                msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                setTimeout(() => {
                    if (memberMute.roles.cache.has(MainRole[0]))
                        return;
                    memberMute.roles.remove(MuteRole.id);
                    memberMute.roles.add(MainRole[0]);
                }, time);
            }
            ;
        }
        ;
    }
};
