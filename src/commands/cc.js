export default {
    name: "cc",
    description: "Clears the amount of messages that we want",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has("MANAGE_MESSAGES")) {
            let amount;
            if (args.length === 0)  amount = 1
            amount = parseInt(args[0]);
            //Fecth the messages that have more than 2 weeks and access to every single of.
            // const messages = await msg.channel.fetch({limit: amount});
            // const { size } = messages;
            // messages.forEach((message:any) => {
            //     message.delete()
            // });
            if (msg) {
                await msg.delete();
            };
            const { size } = await msg.channel.bulkDelete(amount, true)
            msg.channel.send(`Deleted ${size} message(s)`)
        } else {
            msg.channel.send("You do not have permissions to execute this command")
        }
    }
}