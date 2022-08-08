import server from "../schema.js";
export default {
    name: "mains",
    description: "Set or remove the main(s) roles of the guild and create roles. To create the role, write: create [role] [hexadecimal`s color]. Before each name write @",
    execute: async (client, msg, args) => {
        if (msg.author.id === msg.guild.ownerId) {
            if(args.length === 0) return msg.reply("Please provide data")
            
            
            const [option, name, color] = args
            if(!msg.mentions.roles.first()) return msg.reply("Please before the role use @")
            
            const options = {
                "create": () => {
                    if(!name || !color) return msg.reply("Please write the role and the color");
                    const user = client.users.cache.get(msg.guild.ownerId);
                    msg.guild.roles.create({
                        name,
                        color,
                    }).then(async (res) => {
                        user?.send(`The role ${res.name} was created`);
                        await server.updateOne({id: String(msg.guild.id)}, {
                            $push: {
                                "roles.main": res.id
                            }
                        });
                    })
                    msg.reply("Role(s) seted");
                },
                "delete": async () => {
                    const roles = msg.mentions.roles.map(mention => mention.id);
                    await server.updateOne({id: String(msg.guild.id)}, {
                        $pullAll: {
                            "roles.main": roles
                        }
                    });
                    msg.reply("Role(s) deleted")
                },
                "add": async () => {
                    const roles = msg.mentions.roles.map(mention => mention.id);
                    await server.updateOne({id: String(msg.guild.id)}, {
                        $push: {
                            "roles.main": {$each: roles}
                        }
                    });
                    msg.reply("Role(s) seted");    
                }
            }

            options[option]();
           
        } else {
            msg.reply("You do not have permissions to set the main(s) role");  
        };
    }   
}