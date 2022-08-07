import server from "../schema.js"
export default {
    name: "webHook",
    description: "Create a webhook, follow the next, the name of the channel you want the webhook to send the messages, the name of the webhook and if you want the image for(the link)",
    execute(client, msg, args) {
        if (msg.author.id === msg.guild.ownerId) {
            if (args.length === 0) return msg.reply("Please provide the data")
            const [nameChannel, name, img] = args;
            const channel = msg.guild.channels.cache.find((channel) => channel.name === nameChannel);
            if (!channel) return msg.reply("The channel does not exist")
            if (!img) {
                channel.createWebhook(name)
                    .then(async (res) => {
                        console.log(res.token);
                        const sv = await server.updateOne({id: String(msg.guild.id)}, {
                            $set: {
                                "webHook.id": res.id,
                                "webHook.token": res.token
                            } 
                        });
                        msg.reply("Webhook created");
                    });
            } else {
                channel.createWebhook(name, {
                    avatar: img
                }).then(async (res) => {
                    const sv = await server.updateOne({id: String(msg.guild.id)}, {
    
                        $set: {
                            "webHook.id": res.id,
                            "webHook.token": res.token
                        } 
                    });
                    msg.reply("Webhook created");
                });
            };
        } else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
}