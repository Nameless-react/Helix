import { MessageEmbed, WebhookClient, MessageButton, MessageActionRow, Role } from "discord.js";
import { bold } from "@discordjs/builders";
import dotenv from "dotenv";
import server from "./schema";
import ms from "ms";
import moment from "moment";
dotenv.config();

const cHandler = (command) => client.application?.commands.cache.get(command);

export const BadWords = async (msg) => {
    !msg.member && msg.delete()
                        .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                        .catch((err) =>  console.log(err))

    // if(!msg.member) {
    //     msg.delete()
    //         .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
    //         .catch((err) =>  console.log(err))

    //* Agregar los roles que tengan permiso de usar el comando !censoredWord en vez de tener que revisar si el contenido del mensaje contiene el comando
    if (msg.author.id !== "900182160017883197" && msg.author.id !== msg.guild.ownerId) {
        const regex = /[se]+x[0o]?|f[*u]ck|hijo\s?de\s?puta|puta|nigg?a|p[e4]ne|v[a4]gina|idiota|idiot|bitch|dick|milf/ig;
        const result = msg.content.match(regex);
        
        const sv = await server.findOne({id: String(msg.guild.id)});
        const words = new RegExp(sv.censoredWord.join("|")).test(msg.content); 
        if (result && !msg.content.startsWith("!censoredWord") || words && !msg.content.startsWith("!censoredWord")) {   
            msg.delete()
                .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                .catch((err) => console.log(err))
        };
    };
};

export const searchLink = (msg) => {
    !msg.member && msg.delete()
                    .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                    .catch((err) =>  console.log(err))
    // if(!msg.member) {
    //     msg.delete()
    //         .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
    //         .catch((err) => console.log(err))
    
    
    if (!msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"])) {
        if (msg.author.id !== msg.guild.ownerId) {
            const regex = /(^)?(https?:\/\/|www\.|https?:\/\/www\.)[a-z0-9.-/?=&_#:]+|@everyone/ig;
            const result = msg.content.match(regex);
            result && msg.delete()
                            .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                            .catch((err) => console.log(err))
            // if (result) {   
            //     msg.delete()
            //     .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
            //     .catch((err) => {
            //         console.log(err)
            //     });
            // };
        };
    };
};


const WelcomeEmbed = (server) => {
    return new MessageEmbed()
    .setColor("#00ff00")
    .setTitle(`Welcome to ${server.guild.name}`)
    .setThumbnail(server.user.avatarURL({dynamic: true, size: 512}))
    .setAuthor(server.user.username, server.displayAvatarURL({dynamic: true, size: 300}))
} 


const DMEmbed = (client) => {
    let embed = {
        color: "#ee069f",
        title: "Do you need help?\nHere are some commands",
        url: "https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor",
        thumbnail: client.user.avatarURL({dynamic: true, size: 512}),
        author:  {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL({dynamic: true, size: 300})
        },
        fields: []
    };
    client.application?.commands.cache.forEach((cmd) => {
        let field = {name: `${cmd.name}:`, value: `${cmd.description}`}
        embed.fields.push(field);
    });
    return embed
};

const suggesEmbed = (content, author, img, msg) => {
    return new MessageEmbed()
    .setAuthor(`${author}`, img)
    .setColor("#00ff00")
    .setTitle(`Id:\n${msg.id}`)
    .setDescription(`Suggestion:\n${bold(content)}`)
}

const StatusEmbed = (content, author, img, status, reason, color, id, staff) => {
    return new MessageEmbed()
    .setAuthor(`${author}`, img)
    .setColor(color)
    .setDescription(`${content}\n
                    Id:\n${bold(id)}\n
                    Status:\n${bold(status.toUpperCase())}\n
                    Because:\n${bold(reason)}\n
                    Staff:\n${bold(staff)}`)
}

const BanEmbed = (list) => {
    let embed =  {
        title: "Ban list",
        color: "#ff0000",
        fields: []
    };
    for (let i = 0; i < list.length; ++i) {
        let BanField = { name: `User ${bold(list[i].username)}`, value: `Id: ${bold(list[i].id)},\n Reason: ${bold(list[i].reason)}`};
        embed.fields.push(BanField)
    };
    return embed
};

export const buttonTick = () => { 
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("Open")
        .setLabel("Open Ticket")
        .setStyle("PRIMARY")
        .setEmoji("🎫")
    )
}    

export const TickEmbed = (msg) => {
    return new MessageEmbed()
    .setTitle("Ticket 🎫")
    .setDescription(`This ticket allow you to talk with the staff in a private room`)
    .setColor("WHITE");
}

const ProfileEmbed = (member, msg) => {
    let roles = []
    
    member.roles.cache.each((role) => {
        if (role.name === "@everyone") return
        roles.push(`<@&${role.id}>`)
    });
    
    const target = msg.mentions.users.first() || msg.author;
    const activities = member.presence?.activities[0]?.name;
    
    const status = member.presence?.status
    
    
    const embed = new MessageEmbed()
    .setTitle("Profile:")
    .setAuthor( member.user.username, member.user.displayAvatarURL())
    .setThumbnail(target.displayAvatarURL({dynamic: true}))
    .addFields(
        { name: "Id:", value: `${member.user.id}` },
        { name: "Status:", value: `${status || "Offline"}` },
        { name: "Presence:", value: `${activities || "Doing Nothing"}`, inline: true },
        { name: "Time in guild:", value: `${moment(member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment(member.joinedAt).startOf("day").fromNow()}**-**` },
        { name:"Account created:", value: `${moment(target.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment(target.createdAt).startOf("day").fromNow()}**-**` },    
        { name:"Roles:", value: `${roles.length === 0 ? "No roles" : roles.join("\n")}` },
    )
    .setColor("NOT_QUITE_BLACK")
    return embed
}


export const commands = async (msg, client, cdm, args, MuteRole, sv) => {
    if (sv.roles.main === [] && !msg.content.startsWith("!mains")) return msg.channel.send("Please set the main(s) role(s) with !mains [name of the role(s)], to use the commands of the bot");
    if (sv.roles.mute === "none" && !msg.content.startsWith("!muteRole")) return msg.channel.send("Please set the mute role with !muteRole [name of the role], to use the commands of the bot");

    let command;
    switch(cdm) {
        case "kick":
            command = client.application?.commands.cache.get("kick");
            command.execute(client, msg, args);
            break;
        case "ban":
            command = client.application?.commands.cache.get("ban");
            command.execute(client, msg, args);
            break;
        case "unban":
            command = client.application?.commands.cache.get("unban");
            command.execute(client, msg, args);
            break;
        case "censoredWord":
            command = client.application?.commands.cache.get("censoredWord");
            command.execute(client, msg, args);
            break;
        case "crole":
            command = client.application?.commands.cache.get("crole");
            command.execute(client, msg, args);
            break;
        case "help":
            command = client.application?.commands.cache.get("help");
            command.execute(client, msg, DMEmbed);
            break;
        case "ping":
            command = client.application?.commands.cache.get("ping");
            command.execute(client, msg);
            break;
        case "mute":
            command = client.application?.commands.cache.get("mute");
            command.execute(client, msg, args, ms, MuteRole);
            break;
        case "unmute":
            command = client.application?.commands.cache.get("unmute");
            command.execute(client, msg, args, MuteRole)
            break;
        case "banlist":
            command = client.application?.commands.cache.get("banlist");
            command.execute(client, msg, BanEmbed)
            break;
        case "cc":
            command = client.application?.commands.cache.get("cc");
            command.execute(client, msg, args);
            break;
        case "status":
            command = client.application?.commands.cache.get("status");
            command.execute(client, msg, args, StatusEmbed);
            break;
        case "autoRole":
            command = client.application?.commands.cache.get("autoRole");
            command.execute(client, msg, args);
            break;
        case "lock":        
            command = client.application?.commands.cache.get("lock");
            command.execute(client, msg, args);
            break;
        case "unlock":        
            command = client.application?.commands.cache.get("unlock");
            command.execute(client, msg, args);
            break;
        case "moderate":
            command = client.application?.commands.cache.get("moderate");
            command.execute(client, msg, args);
            break;
        case "links":
            command = client.application?.commands.cache.get("links");
            command.execute(client, msg, args);
            break;
        default: 
            msg.channel.send(`The commnad "${cdm}" does not exist`);
    };
};


export const PublicCommands = (msg, client, cdm, args) => {
    const commands = {
        "ticket": () => cHandler("ticket").execute(client, msg, TickEmbed, buttonTick),
        "suggest": () => cHandler("suggest").execute(client, msg, suggesEmbed, args),
        "profile": () => cHandler("profile").execute(client, msg, ProfileEmbed, args),
        "8ball": () => cHandler("8ball").execute(client, msg, args),
    }

    commands[cdm]();
    // if (cdm === "ticket") {
    //     const command = client.application?.commands.cache.get("ticket");
    //     command.execute(client, msg, TickEmbed, buttonTick);
    // } else if (cdm === "suggest") {
    //     const command = client.application?.commands.cache.get("suggest");
    //     command.execute(client, msg, suggesEmbed, args);
    // } else if (cdm === "profile") {
    //     const command = client.application?.commands.cache.get("profile");
    //     command.execute(client, msg, ProfileEmbed, args);
    // } else if (cdm === "8ball") {
    //     const command = client.application?.commands.cache.get("8ball");
    //     command.execute(client, msg, args);
    // }
} 


export const configCommands = (msg, client, args, cdm) => {
    const commands = {
        "mains": () => cHandler("mains").execute(client, msg, args),
        "muteRole": () => cHandler("muteRole").execute(client, msg, args),
        "setprefix": () => cHandler("setprefix").execute(client, msg, args),
        "webHook": () => cHandler("webHook").execute(client, msg, args),
    }

    commands[cdm]();

    // let command;
    // switch(cdm) {
    //     case "setprefix":
    //         command = client.application?.commands.cache.get("setprefix");
    //         command.execute(client, msg, args);
    //         break;
    //     case "mains":
    //         command = client.application?.commands.cache.get("mains");
    //         command.execute(client, msg, args);
    //         break;
    //     case "muteRole":
    //         command = client.application?.commands.cache.get("muteRole");
    //         command.execute(client, msg, args);
    //         break;
    //     case "webHook":
    //         command = client.application?.commands.cache.get("webHook");
    //         command.execute(client, msg, args);
    //         break;
    // }
}


export const WebHook = (id, token) => {
    return new WebhookClient({
        id,
        token,
    });  
};

export default WelcomeEmbed


