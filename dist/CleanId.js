"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHook = exports.PublicCommands = exports.commands = exports.TickEmbed = exports.buttonTick = exports.searchLink = exports.BadWords = exports.cleanId = void 0;
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const dotenv_1 = __importDefault(require("dotenv"));
const ms_1 = __importDefault(require("ms"));
dotenv_1.default.config();
const cleanId = (prefix, args, msg) => {
    const [id, ...rest] = args[0].substring(prefix.length + 2).split(">");
    const member = msg.guild.members.cache.get(id);
    return member;
};
exports.cleanId = cleanId;
const BadWords = (msg) => {
    if (!msg.member) {
        msg.delete()
            .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
            .catch((err) => {
            console.log(err);
        });
    }
    else if (msg.author.id !== "900182160017883197" && msg.author.id !== msg.guild.ownerId) {
        const regex = /[se]+x[0o]?|f[*u]ck|hijo\s?de\s?puta|puta|nigg?a|p[e4]ne|v[a4]gina|idiota|idiot|bitch|dick|milf/ig;
        let result = msg.content.match(regex);
        if (result) {
            msg.delete()
                .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                .catch((err) => {
                console.log(err);
            });
        }
        ;
    }
    ;
};
exports.BadWords = BadWords;
const searchLink = (msg) => {
    if (!msg.member) {
        msg.delete()
            .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
            .catch((err) => {
            console.log(err);
        });
    }
    else if (!msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"])) {
        if (msg.author.id !== msg.guild.ownerId) {
            const regex = /(^)?(https?:\/\/|www\.|https?:\/\/www\.)[a-z0-9.-/?=&_#:]+|@everyone/ig;
            let result = msg.content.match(regex);
            if (result) {
                msg.delete()
                    .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                    .catch((err) => {
                    console.log(err);
                });
            }
            ;
        }
        ;
    }
    ;
};
exports.searchLink = searchLink;
const Embed = (server) => {
    return new discord_js_1.MessageEmbed()
        .setColor("#ff00ff")
        .setTitle("Welcome")
        .setURL("https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor")
        .setThumbnail(server.user.avatarURL({ dynamic: true, size: 512 }))
        .setAuthor(server.user.username, server.displayAvatarURL({ dynamic: true, size: 300 }))
        .setDescription(`Welcome ${server.user.username} to the ${server.guild.name}!\n
    Account Created: <t:${server.joinedTimestamp / 10000}:R>`);
};
const DMEmbed = (client) => {
    let embed = {
        color: "#ee069f",
        title: "Do you need help?\nHere are some commands",
        url: "https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor",
        thumbnail: client.user.avatarURL({ dynamic: true, size: 512 }),
        author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL({ dynamic: true, size: 300 })
        },
        fields: []
    };
    client.application?.commands.cache.forEach((cmd) => {
        let field = { name: `${cmd.name}:`, value: `${cmd.description}` };
        embed.fields.push(field);
    });
    return embed;
};
const suggesEmbed = (content, author, img, msg) => {
    return new discord_js_1.MessageEmbed()
        .setAuthor(`${author}`, img)
        .setColor("#00ff00")
        .setTitle(`Id:\n${msg.id}`)
        .setDescription(`Suggestion:\n${builders_1.bold(content)}`);
};
const StatusEmbed = (content, author, img, status, reason, color, id, staff) => {
    return new discord_js_1.MessageEmbed()
        .setAuthor(`${author}`, img)
        .setColor(color)
        .setDescription(`${content}\n
                    Id:\n${builders_1.bold(id)}\n
                    Status:\n${builders_1.bold(status.toUpperCase())}\n
                    Because:\n${builders_1.bold(reason)}\n
                    Staff:\n${builders_1.bold(staff)}`);
};
const BanEmbed = (list) => {
    let embed = {
        title: "Ban list",
        color: "#ff0000",
        fields: []
    };
    for (let i = 0; i < list.length; ++i) {
        let BanField = { name: `User ${builders_1.bold(list[i].username)}`, value: `Id: ${builders_1.bold(list[i].id)},\n Reason: ${builders_1.bold(list[i].reason)}` };
        embed.fields.push(BanField);
    }
    ;
    return embed;
};
const buttonTick = () => {
    return new discord_js_1.MessageActionRow()
        .addComponents(new discord_js_1.MessageButton()
        .setCustomId("Open")
        .setLabel("Open Ticket")
        .setStyle("PRIMARY")
        .setEmoji("🎫"));
};
exports.buttonTick = buttonTick;
const TickEmbed = (msg) => {
    return new discord_js_1.MessageEmbed()
        .setTitle("Ticket 🎫")
        .setDescription(`This ticket allow you to talk with the staff in a private room`)
        .setColor("WHITE");
};
exports.TickEmbed = TickEmbed;
const commands = (msg, prefix, client, cdm, args, MuteRole, MainRole) => {
    let command;
    switch (cdm) {
        case "setprefix":
            command = client.application?.commands.cache.get("setprefix");
            command.execute(client, msg, args);
            break;
        case "main":
            command = client.application?.commands.cache.get("main");
            command.execute(client, msg, args);
            break;
        case "mauteRole":
            command = client.application?.commands.cache.get("muteRole");
            command.execute(client, msg, args);
            break;
        case "kick":
            command = client.application?.commands.cache.get("kick");
            command.execute(client, msg, args, exports.cleanId, prefix);
            break;
        case "ban":
            command = client.application?.commands.cache.get("ban");
            command.execute(client, msg, args, exports.cleanId, prefix);
            break;
        case "unban":
            command = client.application?.commands.cache.get("unban");
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
            command.execute(client, msg, args, ms_1.default, MainRole, MuteRole);
            break;
        case "unmute":
            command = client.application?.commands.cache.get("unmute");
            command.execute(client, msg, args, MainRole, MuteRole);
            break;
        case "banlist":
            command = client.application?.commands.cache.get("banlist");
            command.execute(client, msg, BanEmbed);
            break;
        case "cc":
            command = client.application?.commands.cache.get("cc");
            command.execute(client, msg, args);
            break;
        case "status":
            command = client.application?.commands.cache.get("status");
            command.execute(client, msg, args, StatusEmbed);
            break;
        case "lock":
            command = client.application?.commands.cache.get("lock");
            command.execute(client, msg, args, exports.cleanId);
            break;
        case "unlock":
            command = client.application?.commands.cache.get("unlock");
            command.execute(client, msg, args, exports.cleanId);
            break;
        case "moderate":
            command = client.application?.commands.cache.get("moderate");
            command.execute(client, msg, args);
            break;
        default:
            msg.channel.send(`The commnad "${cdm}" does not exist`);
    }
    ;
};
exports.commands = commands;
const PublicCommands = (msg, prefix, client, cdm, args) => {
    if (cdm === "ticket") {
        const command = client.application?.commands.cache.get("ticket");
        command.execute(client, msg, exports.TickEmbed, exports.buttonTick);
    }
    else if (cdm === "suggest") {
        const command = client.application?.commands.cache.get("suggest");
        command.execute(client, msg, suggesEmbed, args);
    }
};
exports.PublicCommands = PublicCommands;
exports.WebHook = new discord_js_1.WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN,
});
exports.default = Embed;
