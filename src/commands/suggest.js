export default {
    name: "suggest",
    description: "Make a suggestion",
    execute(client, msg, suggesEmbed, args) {
        if (args.length === 0) return msg.reply("No suggestion was provided")

        const suggestions = msg.guild.channels.cache.find(channel => channel.name.match(/sugerencias?|suggestions?|suggest/ig));
        msg.delete().then(res => {
            suggestions.send({
                embeds: [suggesEmbed(args.join(" "), msg.author.username, msg.author.displayAvatarURL(), msg)]
            })
        })
    }
}