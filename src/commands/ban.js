export default {
    name: "ban",
    description: "Ban users from the server, follow the next: the member and the reason",
    execute(client, msg, args) {
        if (msg.member?.permissions.has("BAN_MEMBERS")) {
            if (args.length === 0) return msg.reply("Please provide a member");
            const { id } = msg.mentions.users.first();
            const member = msg.guild.members.cache.get(id);
            const [, ...cause] = args; 

            if (!member) return msg.channel.send("The user was not found")
            member.ban({ reason }) 
                .then((member) => {
                    msg.channel.send(`The user ${member} has been ban, because "${!reason ? "Not given" : cause.join(" ")}"`);
                }).catch((err) => msg.reply("I do not have permissions"))

        } else {
            msg.channel.send("You do not have permissions to execute this command")
        }
    } 
}