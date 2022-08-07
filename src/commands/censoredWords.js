import server from "../schema";
export default {
    name: "censoredWord",
    description: "Specify which words you want to censor, you can delete or add it (if it is a phrase, write it without spaces), the words are going to be censored when the moderate mode is true",
    execute: async(client, msg, args) => {
        if (msg.member?.permissions.has(["MANAGE_MESSAGES", "MANAGE_CHANNELS"]) ||msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0) return msg.reply("Please provide the data")
            const [query, ...words] = args;
            if (query === "add") {
                const sv = await server.updateOne({id: String(msg.guild.id)}, {
                    $push: {
                        censoredWord: {$each: words}
                    }
                });
                msg.reply("Word added");
            } else if (query === "delete") {
                const sv = await server.updateOne({id: String(msg.guild.id)}, {
                    $pullAll: {
                        censoredWord: words
                    }
                });
                msg.reply("Word deleted");
            };
        } else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
}