"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
const CleanId_1 = __importStar(require("./CleanId"));
dotenv_1.default.config();
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_BANS
    ],
    partials: ["MESSAGE", "REACTION"]
});
const token = process.env.DISCORD_BOT_TOKEN;
const prefix = "!";
exports.client.on("ready", () => {
    var _a, _b;
    const commandFiles = fs_1.default.readdirSync("./dist/commands").filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        (_a = exports.client.application) === null || _a === void 0 ? void 0 : _a.commands.cache.set(command.default.name, command.default);
        if (!command) {
            console.log(`The command ${command.default.name} is ❌`);
            return;
        }
        console.log(`The command ${command.default.name} is ✔`);
    }
    ;
    console.log(`${exports.client.user.username} is on`);
    (_b = exports.client.user) === null || _b === void 0 ? void 0 : _b.setActivity("Configurarme", {
        type: "PLAYING"
    });
});
exports.client.on("messageCreate", (msg) => {
    var _a;
    if (msg.author.bot)
        return;
    console.log(`The user ${msg.author.tag} sent a message saying ${msg.content}`);
    CleanId_1.searchLink(msg);
    if (msg.content.startsWith(prefix)) {
        const [cdm, ...args] = msg.content.trim().substring(prefix.length).split(/\s+/);
        if (((_a = exports.client.application) === null || _a === void 0 ? void 0 : _a.commands.cache.get("ticket").name) === cdm) {
            CleanId_1.PublicCommands(msg, prefix, exports.client, cdm, args);
            return;
        }
        else {
            CleanId_1.commands(msg, prefix, exports.client, cdm, args);
            return;
        }
    }
    ;
    if (msg.content === "files") {
        msg.reply(`Hello${msg.author.tag}`);
        msg.channel.send({
            files: [{
                    attachment: "../Llave.png",
                    name: "Llave.png",
                }, {
                    attachment: "../Diseños/CSS.jpeg",
                    name: "CSS.jpeg",
                }
            ],
        });
    }
    ;
});
exports.client.on("messageReactionAdd", (reaction, user) => {
    var _a;
    const { name } = reaction.emoji;
    const member = (_a = reaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user.id);
    if (reaction.message.id === "904190276246048778") {
        const MainRole = reaction.message.guild.roles.cache.find((role) => role.name === "normal").id;
        switch (name) {
            case "✅":
                member === null || member === void 0 ? void 0 : member.roles.add(MainRole);
                break;
            case "🥶":
                break;
            case "👌":
                break;
        }
        ;
    }
    ;
});
exports.client.on("guildMemberAdd", (server) => {
    const embed = CleanId_1.default(server);
    CleanId_1.WebHook.send({
        embeds: [embed]
    });
});
exports.client.on("messageUpdate", (msg) => {
    CleanId_1.searchLink(msg);
});
exports.client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!interaction.isButton())
        return;
    if (interaction.customId === "Open") {
        const name = `ticket-${interaction.user.username.toLowerCase()}${interaction.user.discriminator}`;
        const ticket = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get("904888921081663538");
        const equal = ticket.children.find((m) => m.name === name);
        if (equal) {
            return interaction.reply({
                content: `You have a open ticket, here <#${equal.id}>`,
                ephemeral: true
            });
        }
        const channel = yield interaction.guild.channels.create(`Ticket: ${interaction.user.tag}`, {
            parent: "904888921081663538",
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
        const MsgTicket = yield channel.send("Thank you for contacting us, wait until a member of our team join");
        try {
            yield MsgTicket.react("❌");
            yield MsgTicket.react("🔒");
        }
        catch (err) {
            channel.send("Error sending emojis");
            throw err;
        }
        ;
        const AdminRole = interaction.guild.roles.cache.find((role) => role.name === "Admin").id;
        const filter = ((reaction, user) => reaction.message.guild.members.cache.find((m) => m.id === user.id).roles.cache.has(AdminRole));
        const collector = MsgTicket.createReactionCollector({
            filter
        });
        setTimeout(() => {
            collector.on("collect", (reaction, user) => {
                console.log(reaction.message.guild.members.cache.find((m) => m.id === user.id).roles.cache.has(AdminRole));
                switch (reaction.emoji.name) {
                    case "🔒":
                        channel.permissionOverwrites.create(interaction.user.id, {
                            SEND_MESSAGES: false,
                        });
                        break;
                    case "❌":
                        channel.send("Deleting this channel in 5 seconds");
                        setTimeout(() => channel.delete(), 5000);
                        break;
                }
                ;
            });
        }, 1000);
    }
    ;
}));
exports.client.login(token);
