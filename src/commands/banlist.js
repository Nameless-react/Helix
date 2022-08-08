export default {
    name: "banlist",
    description: "Show the list of persons that are ban",
    execute: async (client, msg, BanEmbed) => {
        if (msg.member.permissions.has("BAN_MEMBERS")) {
            const bans = await msg.guild.bans.fetch();
            const list = bans.map(({ user, reason }) => ({username: user?.username, id: user?.id, reason}));
            
            
            if (list.length === 0) return msg.reply("The list is empty") 

            msg.channel.send({
                embeds: [BanEmbed(list)]
            });
        } else {
            msg.channel.send("You do not have permissions to execute this command")
        };
    }
}