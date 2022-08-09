
import server from "../schema.js";
export default {
    name: "setprefix",
    description: "Change the predetermined prefix to anyone you want",
    execute: async (client, msg, args) => {
        if (msg.author.id === msg.guild.ownerId) {
            if(args.length === 0) return msg.reply("Please provide the new prefix")
            await server.updateOne({id: String(msg.guild.id)}, {
                prefix: args[0]
            });
            msg.reply("Prefix updated");
        } else {
            msg.reply("Only the owner(s) has permissions to execute this command");
        }
    }
}