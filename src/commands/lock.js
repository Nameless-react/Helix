export default {
    name: "lock",
    description: "lock a channel to a certain member(s) or role(s), following the next: [name of the channel], the type (member or role) and the role",
    execute(client, msg, args) {
        if (msg.member.permissions.has("MANAGE_CHANNELS")) {
            if(args.length === 0) return msg.reply("Please provide the data");
            const [roleMember, , lockChannel] = args

            if (!lockChannel) return msg.reply("Please specify which channel you want to lock");
            // else if (!type) return msg.reply("Please specify if is a role or a member");
            if (!roleMember) return msg.reply("Please specify for which role or person you want to lock the channel");
            
            // let roles;
            const channel = msg.guild.channels.cache.find(channel => channel.name === lockChannel);
            if (!channel) return msg.reply(`The channel ${lockChannel} does not exist`)
            
            
            const lock = msg.guild.roles.cache.find(role => role.name === roleMember) || msg.guild.members.cache.get(msg.mentions.users.first().id);
            if (!lock) return msg.reply(`${roleMember} does not exist`)
        
            // if (!roles && type === "role") {
            //     return msg.reply(`The role ${roleMember} does not exist`);
            // } else if (!roles && type === "member") {
            //     const { id } = msg.mentions.users.first();
            //     roles = msg.guild.members.cache.get(id);
            // }
            channel.permissionOverwrites.create(lock, {
                SEND_MESSAGES: false,
                READ_MESSAGE_HISTORY: false
            }).then(res => msg.reply("The channel was lock"))
        } else {
            msg.reply("Only the administrators can execute this command");
        }
    }
}