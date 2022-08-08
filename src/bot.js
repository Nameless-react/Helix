import dontenv from "dotenv";
import fs from "fs";
import { Client, Intents } from "discord.js";
import mongo from "./DB.js";
import { commands, WebHook, searchLink, PublicCommands, BadWords, configCommands } from "./CleanId.js";
import { WelcomeEmbed } from "./embeds.js";
import server from "./schema.js";


dontenv.config();


export const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS
    ],
    partials: ["MESSAGE", "REACTION"]
});

const token = process.env.DISCORD_BOT_TOKEN;

client.on("ready", async () => {
    const commandFiles = fs.readdirSync("src/commands").filter(file => file.endsWith(".js"))

    for (const file of commandFiles) { 
        const { default: command } = await import(`./commands/${file}`);
        client.application?.commands.cache.set(command.name, command);
        console.log(`The command ${command.name} is ✔`)
    };


    console.log(`${client.user.username} is on`);
    await mongo()
        .catch(err => console.log(err));
    console.log("Database is on");


    client.user?.setActivity("!help", {
        type: "PLAYING"
    });
});


client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return  


    const sv = await server.findOne({id: String(msg.guild.id)});
    const MuteRole = msg.guild.roles.cache.get(sv.roles.mute)
 
    sv.links && searchLink(msg);

    if (msg.content.startsWith(sv.prefix)) {
        const [cdm, ...args] = msg.content.trim().substring(sv.prefix.length).split(/\s+/);

        // ["muteRole", "mains", "setprefix", "webHook"].includes(cdm) && configCommands(msg, client, cdm, args);
        
        // if (["ticket", "suggest", "8ball", "profile"].includes(cdm)) {
        //     PublicCommands(msg, client, cdm, args)
        // } else {
        //     commands(msg, client, cdm, args, MuteRole, sv);
        // }
        commands(msg, client, cdm, args, MuteRole, sv);
    }; 
    
    sv.mode && BadWords(msg);
}); 



client.on("messageReactionAdd", async (reaction, user) => {
    const { name } = reaction.emoji;
    const member =  reaction.message.guild?.members.cache.get(user.id);
    const sv  = await server.findOne({id: reaction.message.guild.id})
    if (reaction.message.channel.name === sv.channelRole) {
        for (let i = 0; i < sv.autoRole.roles.length; i++) {
            switch (name) {
                case sv.autoRole.emojis[i]:
                    member?.roles.add(sv.autoRole.roles[i])
                        .catch(err => {
                            reaction.message.channel.send("I do not have permissions").then((res) => setTimeout(() => {
                                res.delete()
                            }, 3000));
                        });
            };
        };
    };
});



client.on("guildMemberAdd", async (servers) => {
    await server.updateOne({id: String(servers.guild.id)}, {
        membersCount: servers.guild.memberCount
    });
    const sv = await server.findOne({id: String(servers.guild.id)});
    if (sv.webHook.id && sv.webHook.token) {
        const Web = WebHook(sv.webHook.id, sv.webHook.token)
        Web.send({
            embeds: [WelcomeEmbed(servers)]
        });
    } else return;
});


client.on("guildMemberRemove", async (servers) => {
    await server.updateOne({id: String(servers.guild.id)}, {
        membersCount: servers.guild.memberCount
    });
})


client.on("messageUpdate", (msg) => {
    searchLink(msg.reactions.message)
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return

    if (interaction.customId === "Open") {
        let ticket;
        const name = `ticket-${interaction.user.username.toLowerCase()}${interaction.user.discriminator}`;
        ticket = interaction.guild?.channels.cache.find((ticket) => ticket.name.match(/tickets?/ig));
        if (!ticket) {
            ticket = await interaction.guild.channels.create("ticket", {
                type: "GUILD_CATEGORY"
            });
        };

        const equal = ticket.children.find(m => m.name === name);
        if (equal) {
            return interaction.reply({
                content: `You have an open ticket, here <#${equal.id}>`,
                ephemeral: true
            });
        }
        const channel = await interaction.guild.channels.create(`Ticket: ${interaction.user.tag}`, {
            parent: ticket?.id,
            permissionOverwrites: [
                {
                    id: interaction.guildId,
                    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                    id: interaction.user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }
            ]
        });
        interaction.reply({
            content: `We are going to stay with you in ${channel}`,
            ephemeral: true
        });

        const MsgTicket = await channel.send("Thank you for contacting us, wait until a member of our team join");
        try {
            await MsgTicket.react("❌")
            await MsgTicket.react("🔒")

        } catch(err) {
            channel.send("Error sending emojis");
            throw err;
        };
        const filter = ((reaction, user) => reaction.message.guild.members.cache.find((m) => m.id === user.id).permissions.any(["BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD"]))
        const collector = MsgTicket.createReactionCollector({
            filter
        });
        
        setTimeout(() => {
            collector.on("collect", (reaction, user) => {
                // console.log(reaction.message.guild!.members.cache.find((m) => m.id === user.id).roles.cache.has(AdminRole))
                switch(reaction.emoji.name) {
                    case "🔒":
                        channel.permissionOverwrites.create(interaction.user.id, {
                            SEND_MESSAGES: false,
                        });
                        break;
                    case "❌":
                        channel.send("Deleting this channel in 5 seconds");
                        setTimeout(() => channel?.delete(), 5000)
                        break;
                };
    
            });
        }, 1000)
    };
})



client.on("guildCreate", async (guild) => {
    const Data = new server({
        id: guild.id,
        server: guild.name,
        mode: false,
        links: false,
        prefix: "!",
        membersCount: guild.memberCount,
        roles: {
            main: [],
            mute: "none"
        },
        autoRole: {
            emojis: [],
            roles: []
        },
        censoredWord: []
    });
    await Data.save()
        .then((res) => console.log("Data saved"))
        .catch((err) => console.log(err));
})

client.on("guildDelete", async (guild) => {
    await server.deleteOne({id: String(guild.id)}).then((res) => console.log("Data deleted")); 
})


client.login(token);
