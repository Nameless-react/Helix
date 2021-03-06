"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHook = exports.configCommands = exports.PublicCommands = exports.commands = exports.TickEmbed = exports.buttonTick = exports.searchLink = exports.BadWords = void 0;
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./schema"));
const ms_1 = __importDefault(require("ms"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
const BadWords = async (msg) => {
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
        const sv = await schema_1.default.findOne({ id: String(msg.guild.id) });
        let words = new RegExp(sv.censoredWord.join("|")).test(msg.content);
        if (result && !msg.content.startsWith("!censoredWord") || words && !msg.content.startsWith("!censoredWord")) {
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
const WelcomeEmbed = (server) => {
    return new discord_js_1.MessageEmbed()
        .setColor("#00ff00")
        .setTitle(`Welcome to ${server.guild.name}`)
        .setThumbnail(server.user.avatarURL({ dynamic: true, size: 512 }))
        .setAuthor(server.user.username, server.displayAvatarURL({ dynamic: true, size: 300 }));
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
        .setEmoji("????"));
};
exports.buttonTick = buttonTick;
const TickEmbed = (msg) => {
    return new discord_js_1.MessageEmbed()
        .setTitle("Ticket ????")
        .setDescription(`This ticket allow you to talk with the staff in a private room`)
        .setColor("WHITE");
};
exports.TickEmbed = TickEmbed;
const ProfileEmbed = (member, msg) => {
    let roles = [];
    member.roles.cache.each((role) => {
        if (role.name === "@everyone")
            return;
        roles.push(`<@&${role.id}>`);
    });
    const target = msg.mentions.users.first() || msg.author;
    let activities = member.presence?.activities[0]?.name;
    let status = member.presence?.status;
    if (roles.length === 0)
        roles = ["No roles"];
    const string = roles.join("\n");
    const embed = new discord_js_1.MessageEmbed()
        .setTitle("Profile:")
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addFields({ name: "Id:", value: `${member.user.id}` }, { name: "Status:", value: `${status || "Offline"}` }, { name: "Presence:", value: `${activities || "Doing Nothing"}`, inline: true }, { name: "Time in guild:", value: `${moment_1.default(member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment_1.default(member.joinedAt).startOf("day").fromNow()}**-**` }, { name: "Account created:", value: `${moment_1.default(target.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment_1.default(target.createdAt).startOf("day").fromNow()}**-**` }, { name: "Roles:", value: `${string}` })
        .setColor("NOT_QUITE_BLACK");
    return embed;
};
const commands = async (msg, client, cdm, args, MuteRole, sv) => {
    if (sv.roles.main === [] && !msg.content.startsWith("!mains"))
        return msg.channel.send("Please set the main(s) role(s) with !mains [name of the role(s)], to use the commands of the bot");
    if (sv.roles.mute === "none" && !msg.content.startsWith("!muteRole"))
        return msg.channel.send("Please set the mute role with !muteRole [name of the role], to use the commands of the bot");
    let command;
    switch (cdm) {
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
            command.execute(client, msg, args, ms_1.default, MuteRole);
            break;
        case "unmute":
            command = client.application?.commands.cache.get("unmute");
            command.execute(client, msg, args, MuteRole);
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
    }
    ;
};
exports.commands = commands;
const PublicCommands = (msg, client, cdm, args) => {
    if (cdm === "ticket") {
        const command = client.application?.commands.cache.get("ticket");
        command.execute(client, msg, exports.TickEmbed, exports.buttonTick);
    }
    else if (cdm === "suggest") {
        const command = client.application?.commands.cache.get("suggest");
        command.execute(client, msg, suggesEmbed, args);
    }
    else if (cdm === "profile") {
        const command = client.application?.commands.cache.get("profile");
        command.execute(client, msg, ProfileEmbed, args);
    }
    else if (cdm === "8ball") {
        const command = client.application?.commands.cache.get("8ball");
        command.execute(client, msg, args);
    }
};
exports.PublicCommands = PublicCommands;
const configCommands = (msg, client, args, cdm) => {
    let command;
    switch (cdm) {
        case "setprefix":
            command = client.application?.commands.cache.get("setprefix");
            command.execute(client, msg, args);
            break;
        case "mains":
            command = client.application?.commands.cache.get("mains");
            command.execute(client, msg, args);
            break;
        case "muteRole":
            command = client.application?.commands.cache.get("muteRole");
            command.execute(client, msg, args);
            break;
        case "webHook":
            command = client.application?.commands.cache.get("webHook");
            command.execute(client, msg, args);
            break;
    }
};
exports.configCommands = configCommands;
const WebHook = (id, token) => {
    return new discord_js_1.WebhookClient({
        id,
        token,
    });
};
exports.WebHook = WebHook;
exports.default = WelcomeEmbed;
