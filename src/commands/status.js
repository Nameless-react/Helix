export default {
    name: "status",
    description: "Accept or deny a suggestion, to execute this command follow the next: deny or accepted, the id of the suggest and the reason",
    execute(client, msg, args, StatusEmbed) {
        if (msg.member?.permissions.has("KICK_MEMBERS") && msg.member?.permissions.has("BAN_MEMBERS") && msg.member
        ?.permissions.has("MANAGE_MESSAGES")) {
            if(args.length === 0) msg.reply("Data do not provide");
            const [status, id, ...rest] = args;
            
            if (isNaN(parseInt(id))) return msg.reply(`The id "${id}" is not valid`);
        
            if (msg.channel.name.match(/sugerencias?|suggestions?|suggest/ig)) {
                msg.channel.messages.fetch().then(res => {
                    const message = res.find(message => message.embeds[0]?.title === `Id:\n${id}` && message.author.id === "900182160017883197");
                    
                    if (!message) {
                        msg.delete();
                        msg.channel.send(`The id "${id}" does not exist`)
                            .catch(err => console.log(err));
                    
                         return
                    }; 
                    if (status !== "accepted" && status !== "denied") return msg.reply("The status is not valid");
                    
                    message.edit({
                        embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, rest.join(" "), status === "deny" ? "#ff0000" : "ffff00", id, msg.author.username)]
                    })
                    // if (status === "deny") {
                    //     message.edit({
                    //         embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, rest.join(" "), "#ff0000", id, msg.author.username)]
                    //     })
                    // } else if (status === "accepted") {
                    //     message.edit({
                    //         embeds: [StatusEmbed(message.embeds[0]?.description, message.embeds[0]?.author.name, message.embeds[0]?.author.iconURL, status, rest.join(" "), "#ffff00", id, msg.author.username)]
                    //     })
                    // } else {
                    //     msg.reply("The status is not valid");
                    // }
                }).catch((err) => console.log(err));
                msg.delete();
            }
        } else {
            msg.reply("Only the administrators can execute this command");
        }
    }
}