import server from "../schema.js"
export default {
    name: "moderate",
    description: "Turn on a mode that filter more the content of the message, the content will be filter when the user type a word that you previously added to the list and some predetermine words that we added(only in english and spanish)",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]) ||msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0) return msg.reply("Please write true or false to execute this command");
            if (args[0] !== "true" && args[0] !== "false") return msg.reply(`"${args[0]}" is not a mode`)

            if (!Boolean(args[0])) {
                msg.reply("The moderation mode is off")
                msg.channel.setRateLimitPerUser(0)
                return await server.updateOne({id: String(msg.guild.id)}, {
                    mode: false
                });
            } 
            
            const sv = await server.findOne({id: String(msg.guild.id)});
            if (sv.mode) return msg.reply("The mode is already on")
            
            
            if (Boolean(args[0])) {
                msg.reply("The moderation mode is on");
                msg.channel.setRateLimitPerUser(5)
                return await server.updateOne({id: String(msg.guild.id)}, {
                    mode: true
                })
            };
        } else {
            msg.reply("Only the administrators can execute this command");
        };
    }
}