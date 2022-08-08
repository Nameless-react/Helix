import server from "../schema.js";
export default {
    name: "links",
    description: "Allow to looking for links in the messages and censore it, except for the links in embeds",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has(["MANAGE_MESSAGES", "MANAGE_CHANNELS"]) ||msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0) return msg.reply("Please provide the data")
            if (args[0] !== "true" && args[0] !== "false") {
                return msg.reply(`"${args[0]}" is not a mode`)
            }
            if (args[0] === "false") {
                msg.reply("The detector is off")
                const sv = await server.updateOne({id: String(msg.guild.id)}, {
                    links: false
                });
            } 
            const sv = await server.findOne({id: String(msg.guild.id)});
            if (sv.mode === true) return msg.reply("The detector is already on")
            if (args[0] === "true") {
                msg.reply("The detector is on");
                const sv = await server.updateOne({id: String(msg.guild.id)}, {
                    links: true
                })
            };
        } else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
}