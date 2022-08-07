import server from "../schema.js"
export default {
    name: "crole",
    description: "Assign a channel for the auto role",
    execute: async (client, msg, args) => {
        if (msg.author.id === msg.guild.ownerId) {
            if (args.length === 0) return msg.reply("Please provide data")
            const channel = msg.guild.channels.cache.find((channel) => channel.name === args[0]);
            if (!channel) return msg.reply("The channel does not exist")
            const sv = await server.updateOne({id: String(msg.guild.id)}, {
                $set: {
                    "channelRole": args[0]
                }
            });
            msg.reply("Channel seted")
        } else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
}