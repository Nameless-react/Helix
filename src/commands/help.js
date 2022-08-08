export default {
    name: "help",
    description:  "Show all the commands in the dm channel",
    execute(client, msg, DMEmbed) {
        if (msg.member?.permissions.has("KICK_MEMBERS") ||msg.member?.permissions.has("BAN_MEMBERS") || msg.guild.ownerId === msg.author.id) {
            const user = client.users.cache.get(msg.author.id);
            msg.guild.invites.create("900502275523506176", {
                unique: true,
                maxAge: 30
            }).then(res => {
                user.send({
                    content: `Como estan todos aqui compañeros https://discord.gg/${res.code}`,
                    embeds: [DMEmbed(client)]
                });
            });
        } else {
            msg.channel.send("You do not have permissions to execute this command")
        };
    }
}