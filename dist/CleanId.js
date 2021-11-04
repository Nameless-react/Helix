"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHook = exports.PublicCommands = exports.commands = exports.TickEmbed = exports.buttonTick = exports.searchLink = void 0;
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const ms_1 = __importDefault(require("ms"));
dotenv_1.default.config();
const cleanId = (prefix, args, msg) => {
    const [id, ...rest] = args[0].substring(prefix.length + 2).split(">");
    const member = msg.guild.members.cache.get(id);
    return member;
};
const searchLink = (msg) => {
    const MainRole = msg.guild.roles.cache.find((role) => role.name === "normal").id;
    const ModRole = msg.guild.roles.cache.find((role) => role.name === "MOD").id;
    if (msg.member === null) {
        msg.delete()
            .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
            .catch((err) => {
            console.log(err);
        });
    }
    else if (msg.member.roles.cache.has(MainRole) || msg.member.roles.cache.has(ModRole)) {
        if (msg.author.id !== msg.guild.ownerId) {
            const regex = /(^)?(https?:\/\/|www\.|https?:\/\/www\.)[a-z0-9.-/?=&_#]+|@everyone/ig;
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
const BanEmbed = (list) => {
    let embed = {
        title: "Ban list",
        color: "#ff0000",
        fields: []
    };
    for (let i = 0; i < list.length; ++i) {
        let BanField = { name: `User ${list[i].username}`, value: `Id: ${list[i].id},\n Reason: ${list[i].reason}` };
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
const commands = (msg, prefix, client, cdm, args) => {
    const AdminRole = msg.guild.roles.cache.find((role) => role.name === "Admin").id;
    const BotRole = msg.guild.roles.cache.find((role) => role.name === "Bot").id;
    if (msg.member.roles.cache.has(BotRole) || msg.guild.ownerId === msg.author.id || msg.member.roles.cache.has(AdminRole)) {
        if (cdm === "kick") {
            const command = client.application?.commands.cache.get("kick");
            command.execute(client, msg, args, cleanId, prefix);
        }
        else if (cdm === "ban") {
            const command = client.application?.commands.cache.get("ban");
            command.execute(client, msg, args, cleanId, prefix);
        }
        else if (cdm === "unban") {
            const command = client.application?.commands.cache.get("unban");
            command.execute(client, msg, args);
        }
        else if (cdm === "help") {
            const command = client.application?.commands.cache.get("help");
            command.execute(client, msg, DMEmbed);
        }
        else if (cdm === "mute") {
            const command = client.application?.commands.cache.get("mute");
            command.execute(client, msg, args, ms_1.default);
        }
        else if (cdm === "unmute") {
            const command = client.application?.commands.cache.get("unmute");
            command.execute(client, msg, args);
        }
        else if (cdm === "banlist") {
            const command = client.application?.commands.cache.get("banlist");
            command.execute(client, msg, BanEmbed);
        }
        else if (cdm === "ping") {
            const command = client.application?.commands.cache.get("ping");
            command.execute(client, msg);
        }
        else if (cdm === "cc") {
            const command = client.application?.commands.cache.get("cc");
            command.execute(client, msg, args);
        }
        else {
            msg.channel.send(`The commnad "${cdm}" does not exist`);
        }
    }
    else {
        msg.reply("You do not have permissions to execute this command");
    }
};
exports.commands = commands;
const PublicCommands = (msg, prefix, client, cdm, args) => {
    if (cdm === "ticket") {
        const command = client.application?.commands.cache.get("ticket");
        command.execute(client, msg, exports.TickEmbed, exports.buttonTick);
    }
};
exports.PublicCommands = PublicCommands;
exports.WebHook = new discord_js_1.WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN,
});
exports.default = Embed;
