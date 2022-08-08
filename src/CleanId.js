import dotenv from "dotenv";
import server from "./schema.js";
import ms from "ms";
import { DMEmbed, suggesEmbed, ProfileEmbed, StatusEmbed, BanEmbed, buttonTick } from "./embeds.js";
dotenv.config();

const cHandler = ((client, command) => client.application?.commands.cache.get(command));

export const BadWords = async (msg) => {
    !msg.member && msg.delete()
                        .then(res => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                        .catch(err =>  console.log(err))

    //* Agregar los roles que tengan permiso de usar el comando !censoredWord en vez de tener que revisar si el contenido del mensaje contiene el comando
    if (msg.author.id === "900182160017883197" || msg.author.id === msg.guild.ownerId) return
    // if (msg.author.id !== "900182160017883197" && msg.author.id !== msg.guild.ownerId) {
    const regex = /[se]+x[0o]?|f[*u]ck|hijo\s?de\s?puta|puta|nigg?a|p[e4]ne|v[a4]gina|idiota|idiot|bitch|dick|milf/ig;
    const result = msg.content.match(regex);
    
    const sv = await server.findOne({id: String(msg.guild.id)});
    const words = new RegExp(sv.censoredWord.join("|")).test(msg.content); 
    if (result && !msg.content.startsWith("!censoredWord") || words && !msg.content.startsWith("!censoredWord")) {   
        msg.delete()
            .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
            .catch((err) => console.log(err))
    };
    // };
};

export const searchLink = (msg) => {
    !msg.member && msg.delete()
                    .then(res => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                    .catch(err =>  console.log(err))
    if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"])) return 
    // if (!msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES"])) {

    if (msg.author.id !== msg.guild.ownerId) {
        const regex = /(^)?(https?:\/\/|www\.|https?:\/\/www\.)[a-z0-9.-/?=&_#:]+|@everyone/ig;
        const result = msg.content.match(regex);
        result && msg.delete()
                        .then((res) => msg.channel.send(`<@${msg.author.id}> the content of the message was not allow`))
                        .catch((err) => console.log(err))
    };
    // };
};


export const commands = async (msg, client, cdm, args, MuteRole, sv) => {
    if (sv.roles.main.length === 0 && !msg.content.startsWith("!mains")) return msg.channel.send("Please set the main(s) role(s) with !mains [name of the role(s)], to use the commands of the bot");
    if (sv.roles.mute === "none" && !msg.content.startsWith("!muteRole")) return msg.channel.send("Please set the mute role with !muteRole [name of the role], to use the commands of the bot");

    const commands = {
        "kick": () =>  cHandler(client, "kick").execute(client, msg, args),
        "ban": () =>  cHandler(client, "ban").execute(client, msg, args),
        "unban": () => cHandler(client, "unban").execute(client, msg, args),
        "censoredWord": () => cHandler(client, "censoredWord").execute(client, msg, args),
        "crole": () => cHandler(client, "crole").execute(client, msg, args),
        "help": () => cHandler(client, "help").execute(client, msg, DMEmbed),
        "ping": () => cHandler(client, "ping").execute(client, msg),
        "mute": () => cHandler(client, "kick").execute(client, msg, args, ms, MuteRole),
        "unmute": () => cHandler(client, "kick").execute(client, msg, args, MuteRole),
        "banlist": () => cHandler(client, "banlist").execute(client, msg, BanEmbed),
        "cc": () => cHandler(client, "cc").execute(client, msg, args),
        "status": () => cHandler(client, "status").execute(client, msg, StatusEmbed),
        "autoRole": () => cHandler(client, "autoRole").execute(client, msg, args),
        "lock": () => cHandler(client, "lock").execute(client, msg, args),
        "unlock": () => cHandler(client, "unlock").execute(client, msg, args),
        "moderate": () => cHandler(client, "moderate").execute(client, msg, args),
        "links": () => cHandler(client, "links").execute(client, msg, args),
        "default": () => msg.channel.send(`The commnad "${cdm}" does not exist`)
    };

    commands[cdm] ? commands[cdm]() : commands["default"]();
};

export const PublicCommands = (msg, client, cdm, args) => {
    const commands = {
        "ticket": () => cHandler(client, "ticket").execute(client, msg, TickEmbed, buttonTick),
        "suggest": () => cHandler(client, "suggest").execute(client, msg, suggesEmbed, args),
        "profile": () => cHandler(client, "profile").execute(client, msg, ProfileEmbed, args),
        "8ball": () => cHandler(client, "8ball").execute(client, msg, args),
        "default": () => msg.channel.send(`The commnad "${cdm}" does not exist`)
    }

    // commands[cdm] ? commands[cdm]() : commands["default"]();
} 

export const configCommands = (msg, client, cdm, args) => {
    const commands = {
        "mains": () => cHandler(client, "mains").execute(client, msg, args),
        "muteRole": () => cHandler(client, "muteRole").execute(client, msg, args),
        "setprefix": () => cHandler(client, "setprefix").execute(client, msg, args),
        "webHook": () => cHandler(client, "webHook").execute(client, msg, args),
        "default": () => msg.channel.send(`The commnad "${cdm}" does not exist`)
    }

    // commands[cdm] ? commands[cdm]() : commands["default"]();
}

export const WebHook = (id, token) => {
    return new WebhookClient({
        id,
        token,
    });  
};