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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const discord_js_1 = require("discord.js");
const DB_1 = __importDefault(require("./DB"));
const CleanId_1 = __importStar(require("./CleanId"));
const schema_1 = __importDefault(require("./schema"));
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
exports.client.on("ready", async () => {
    const commandFiles = fs_1.default.readdirSync("./dist/commands").filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        exports.client.application?.commands.cache.set(command.default.name, command.default);
        console.log(`The command ${command.default.name} is ✔`);
    }
    ;
    console.log(`${exports.client.user.username} is on`);
    await DB_1.default()
        .then(res => console.log("Database connected"))
        .catch(err => console.log(err));
    exports.client.user?.setActivity("!help", {
        type: "PLAYING"
    });
});
exports.client.on("messageCreate", async (msg) => {
    if (msg.author.bot)
        return;
    console.log(`The user ${msg.author.tag} sent a message saying ${msg.content}`);
    const sv = await schema_1.default.findOne({ id: String(msg.guild.id) });
    const MuteRole = msg.guild.roles.cache.get(sv.roles.mute);
    CleanId_1.searchLink(msg);
    if (msg.content.startsWith(sv.prefix)) {
        const [cdm, ...args] = msg.content.trim().substring(sv.prefix.length).split(/\s+/);
        if (exports.client.application?.commands.cache.get("ticket").name === cdm || exports.client.application?.commands.cache.get("suggest").name === cdm || exports.client.application?.commands.cache.get("profile").name === cdm || exports.client.application?.commands.cache.get("8ball").name === cdm) {
            CleanId_1.PublicCommands(msg, sv.prefix, exports.client, cdm, args);
        }
        else if (exports.client.application?.commands.cache.get("muteRole").name === cdm || exports.client.application?.commands.cache.get("mains").name === cdm || exports.client.application?.commands.cache.get("setprefix").name === cdm) {
            CleanId_1.configCommands(msg, exports.client, args, cdm);
        }
        else {
            CleanId_1.commands(msg, sv.prefix, exports.client, cdm, args, MuteRole, sv);
        }
    }
    ;
    if (sv.mode) {
        CleanId_1.BadWords(msg);
    }
    ;
});
exports.client.on("messageReactionAdd", async (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild?.members.cache.get(user.id);
    const sv = await schema_1.default.findOne({ id: reaction.message.guild.id });
    if (reaction.message.channel.name === sv.channelRole) {
        for (let i = 0; i < sv.autoRole.roles.length; i++) {
            switch (name) {
                case sv.autoRole.emojis[i]:
                    member?.roles.add(sv.autoRole.roles[i])
                        .catch((err) => {
                        reaction.message.channel.send("I do not have permissions").then((res) => setTimeout(() => {
                            res.delete();
                        }, 3000));
                        console.log(err);
                    });
            }
            ;
        }
        ;
    }
});
exports.client.on("guildMemberAdd", async (servers) => {
    const sv = await schema_1.default.updateOne({ id: servers.guild.id }, {
        membersCount: servers.guild.memberCount
    });
    const embed = CleanId_1.default(servers);
    CleanId_1.WebHook.send({
        embeds: [embed]
    });
});
exports.client.on("guildMemberRemove", async (servers) => {
    const sv = await schema_1.default.updateOne({ id: servers.guild.id }, {
        membersCount: servers.guild.memberCount
    });
});
exports.client.on("messageUpdate", (msg) => {
    CleanId_1.searchLink(msg.reactions.message);
});
exports.client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton())
        return;
    if (interaction.customId === "Open") {
        let ticket;
        const name = `ticket-${interaction.user.username.toLowerCase()}${interaction.user.discriminator}`;
        ticket = interaction.guild?.channels.cache.find((ticket) => ticket.name.match(/tickets?/ig));
        if (!ticket) {
            ticket = await interaction.guild.channels.create("ticket", {
                type: "GUILD_CATEGORY"
            });
        }
        ;
        const equal = ticket.children.find((m) => m.name === name);
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
            await MsgTicket.react("❌");
            await MsgTicket.react("🔒");
        }
        catch (err) {
            channel.send("Error sending emojis");
            throw err;
        }
        ;
        const filter = ((reaction, user) => reaction.message.guild.members.cache.find((m) => m.id === user.id).permissions.any(["BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD"]));
        const collector = MsgTicket.createReactionCollector({
            filter
        });
        setTimeout(() => {
            collector.on("collect", (reaction, user) => {
                switch (reaction.emoji.name) {
                    case "🔒":
                        channel.permissionOverwrites.create(interaction.user.id, {
                            SEND_MESSAGES: false,
                        });
                        break;
                    case "❌":
                        channel.send("Deleting this channel in 5 seconds");
                        setTimeout(() => channel?.delete(), 5000);
                        break;
                }
                ;
            });
        }, 1000);
    }
    ;
});
exports.client.on("guildCreate", async (guild) => {
    const Data = new schema_1.default({
        id: guild.id,
        server: guild.name,
        mode: false,
        prefix: "!",
        membersCount: guild.memberCount,
        roles: {
            main: "none",
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
});
exports.client.on("guildDelete", async (guild) => {
    await schema_1.default.deleteOne({ id: String(guild.id) }).then((res) => console.log("Data deleted"));
});
exports.client.login(token);
