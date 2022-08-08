import server from "../schema.js"
export default {
    name: "autoRole",
    description: "Give a role to the user when he or she react with an emoji, to specify which role and which emoji, follow the next steps: write if you want to delete or add a new autoRole, next before the name of the role write the @ and the emoji you want for",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]) ||msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0) return msg.reply("Please provide data")
            if(!msg.mentions.roles.first()) return msg.reply("Please before the name of the role use @")
            
            
            const { id } = msg.mentions.roles.first()
            const [query, , emoji] = args;
            
            if (query === "add") {
                await server.updateOne({id: String(msg.guild.id)}, {
                    $push: {"autoRole.roles": id, "autoRole.emojis": emoji}
                })
                return msg.reply("AutoRole added");
                
            } else if (query === "delete") {
                await server.updateOne({id: String(msg.guild.id)}, {
                    $pull: {"autoRole.roles": id, "autoRole.emojis": emoji}
                })
                return msg.reply("AutoRole deleted");
            }
        } else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
}