import server from "../schema.js";
export default {
    name: "unmute",
    description: "Unmute a member of the server, note: when you execute this commnad before the time you set in the mute command end, the member will receive a random role of the mains roles.",
    execute: async (client, msg, args, MuteRole) => {
        if (msg.member?.permissions.has("KICK_MEMBERS") || msg.member?.permissions.has("BAN_MEMBERS")) {
            if (args.length === 0) return msg.reply("Please provide an ID");
            const { id } = msg.mentions.users.first();
            const memberMute = msg.guild.members.cache.get(id);
            const sv = await server.findOne({id: String(msg.guild.id)});
            const Main = await msg.guild.roles.cache.random(sv.roles.main)
            if (memberMute.roles.cache.has(MuteRole.id)) {
                if (memberMute) {
                    memberMute.roles.add(Main.id);
                    memberMute.roles.remove(MuteRole.id);
                    msg.channel.send(`The user <@${id}> has been unmuted`);
                }
            }
        }
    }
}