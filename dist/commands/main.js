"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "mains",
    description: "Set the mains roles of the guild or create it. To create the role, write: create, the name of the role and the color you want. Before the names of the roles write @",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        if (msg.author.id === msg.guild.ownerId) {
            if (args[0] === "create") {
                const [, name, color] = args;
                if (!name || !color)
                    return msg.reply("Please write the name and the color for the role");
                const user = client.users.cache.get(msg.guild.ownerId);
                msg.guild.roles.create({
                    name,
                    color,
                }).then(async (res) => {
                    user?.send(`The role ${res.name} was created`);
                    const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                        $set: {
                            "roles.main": res.id
                        }
                    });
                });
                msg.reply("Role(s) seted");
            }
            else {
                let roles = [];
                msg.mentions.roles.each((mention) => {
                    roles.push(mention.id);
                });
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    $set: {
                        "roles.main": roles
                    }
                });
                msg.reply("Role(s) seted");
                roles = [];
            }
        }
        else {
            msg.reply("You do not have permissions to set the main(s) role");
        }
        ;
    }
};
