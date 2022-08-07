export default {
    name: "kick",
    description: "Kick a member from the server",
    execute(client:any, msg:any, args:string[]) {
        if (msg.member.permissions.has("KICK_MEMBERS")) {
            if (args.length === 0) return msg.reply("Please provide an ID");
            const { id } = msg.mentions.users.first();
            const member = msg.guild.members.cache.get(id);
            if (member) {
                member.kick()
                .then((member:any) => {
                    msg.channel.send(`The user ${member} was kicked`)
                }).catch((err:any) => msg.reply("I do not have permissions"))
            } else {
                msg.channel.send("The user was not found")
            }
        } else {
            msg.channel.send("You do not have permissions to execute this command")
        }
    }
}