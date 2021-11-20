"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "mute",
    description: "Mute a member, follow the next archetype: the member and the time in secnds(s), minutes(m), hours(h) or days",
    execute(client, msg, args, ms, MainRole, MuteRole) {
        if (args.length === 0)
            return msg.reply("Please provide an ID");
        const { id } = msg.mentions.users.first();
        let memberMute = msg.guild.members.cache.get(id);
        if (!memberMute.roles.cache.has("900476842098712626"))
            return;
        if (!memberMute.roles.cache.has("902666602598760448")) {
            if (memberMute) {
                if (!args[1]) {
                    memberMute.roles.remove(MainRole.id);
                    memberMute.roles.add(MuteRole.id);
                    msg.channel.send(`The user <@${id}> has been muted`);
                    return;
                }
                ;
                memberMute.roles.remove(MainRole.id);
                memberMute.roles.add(MuteRole.id);
                let time = ms(args[1]);
                if (!time) {
                    time = 600000;
                }
                msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                setTimeout(function () {
                    if (memberMute.roles.cache.has("900476842098712626"))
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
