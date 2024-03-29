export default {
    name: "profile",
    description: "Show some data about the specify user or himself",
    execute(client, msg, ProfileEmbed, args) {
        if (args.length === 0) return msg.channel.send({
                embeds: [ProfileEmbed(msg.member, msg)]
            });
        
        const { id } = msg.mentions.users.first();
        const member = msg.guild.members.cache.get(id);
        msg.channel.send({
            embeds: [ProfileEmbed(member, msg)]
        });
    }
}