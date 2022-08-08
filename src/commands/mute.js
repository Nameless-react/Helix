import server from "../schema.js";
export default {
    name: "mute",
    description: "Mute a member, follow the next: before the member wrtie the @ and the time in seconds(s), minutes(m), hours(h) or days",
    execute: async (client, msg, args, ms, MuteRole) => {
        if (msg.member?.permissions.has("KICK_MEMBER") || msg.member?.permissions.has("BAN_MEMBER")) {
            if (args.length === 0) return msg.reply("Please provide an ID");
                
                const { id } = msg.mentions.users.first();
                const memberMute = msg.guild.members.cache.get(id); 
                const sv = await server.findOne({id: String(msg.guild.id)});
                
                const MainRole = sv.roles.main.flatMap(data => {
                    const role = memberMute.roles.cache.get(data);
                    return role && role.id !== MuteRole.id ? role.id : []; 
                });
                
                if (!memberMute.roles.cache.has(MuteRole.id) && memberMute.roles.cache.hasAny(...sv.roles.main)) {
                    if (memberMute) {
                        const time = !args[1] ? 600000 : ms(args[1]);
                        memberMute.roles.remove(MainRole[0]);
                        memberMute.roles.add(MuteRole.id);
                        msg.channel.send(`The user <@${id}> has been muted for ${time} miliseconds`);
                        setTimeout(() => {
                            if (memberMute.roles.cache.has(MainRole[0])) return
                            memberMute.roles.remove(MuteRole.id);
                            memberMute.roles.add(MainRole[0]);
                        }, time);
                        return
                    };
                }; 
        }
    }
}