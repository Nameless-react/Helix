export default {
    name: "cc",
    description: "Clears the amount of messages that we want",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has("MANAGE_MESSAGES")) {
            if (args.length === 0)  amount = 1
            msg && await msg.delete();

            const { size } = await msg.channel.bulkDelete(args.length === 0 ? 1: parseInt(args[0]), true)
            msg.channel.send(`Deleted ${size} message(s)`)
        } else {
            msg.channel.send("You do not have permissions to execute this command")
        }
    }
}