import server from "../schema.js";
export default {
    name: "muteRole",
    description: "Set the mute role of the guild or create it. To create the role, write: create, [name] [hexadecimal`s color]. Before the role write @ ",
    execute: async (client, msg, args) => {
        if (msg.author.id === msg.guild.ownerId) {
            if(args.length === 0) return msg.reply("Please provide data")
            if(!msg.mentions.roles.first()) return msg.reply("Please before the name of the role use @")
            const [ option, name, color ] = args;

            const options = {
                "create": async () => {
                    const user = client.users.cache.get(msg.guild.ownerId);
                    msg.guild.roles.create({
                        name,
                        color,
                    }).then(async (res)  => {
                        user?.send(`The role ${res.name} was created`)
                        msg.guild.channels.cache.each(channel => channel.permissionOverwrites.create(res.id, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            MUTE_MEMBERS: false,
                            SEND_MESSAGES_IN_THREADS: false,
                            READ_MESSAGE_HISTORY: false
                    }));
                    msg.guild.roles.setPositions([{
                        role: res.id,
                        position: -1
                    }]);
                    await server.updateOne({id: String(msg.guild.id)}, {
                        $set: {
                            "roles.mute": res.id
                        }
                    });
                    });
                    msg.reply("Role seted");    
                },
                "set": async () => {
                    const { id } = msg.mentions.roles.first();
                    await server.updateOne({id: String(msg.guild.id)}, {
                        $set: {
                            "roles.mute": id
                        }
                    });
                    msg.reply("Role seted");
                }
            }

            options[option]();
        } else {
            msg.reply("You do not have permissions to set the mute role");
        }
    }
}