"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "mute",
    description: "Mute a member, follow the next archetype: the member and the time in seconds(s), minutes(m), hours(h) or days",
    execute(client, msg, args, ms, MainRole, MuteRole) {
        if (msg.member?.permissions.has("KICK_MEMBER") || msg.member?.permissions.has("BAN_MEMBER"))
            if (args.length === 0)
                return msg.reply("Please provide an ID");
        const { id } = msg.mentions.users.first();
        let memberMute = msg.guild.members.cache.get(id);
        if (!memberMute.roles.cache.has(MainRole.id))
            return;
        if (!memberMute.roles.cache.has(MuteRole.id)) {
            if (memberMute) {
                let time;
                if (!args[1]) {
                    time = 600000;
                    memberMute.roles.remove(MainRole.id);
                    memberMute.roles.add(MuteRole.id);
                    msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                    setTimeout(() => {
                        if (memberMute.roles.cache.has(MainRole.id))
                            return;
                        memberMute.roles.remove(MuteRole.id);
                        memberMute.roles.add(MainRole.id);
                    }, time);
                    return;
                }
                ;
                memberMute.roles.remove(MainRole.id);
                memberMute.roles.add(MuteRole.id);
                time = ms(args[1]);
                if (!time) {
                    time = 600000;
                }
                ;
                msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                setTimeout(() => {
                    if (memberMute.roles.cache.has(MainRole.id))
                        return;
                    memberMute.roles.remove(MuteRole.id);
                    memberMute.roles.add(MainRole.id);
                }, time);
            }
            ;
        }
        ;
    }
};
