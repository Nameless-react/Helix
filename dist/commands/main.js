"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../DB");
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "main",
    description: "Set the main role of the guild or create it. To create the role, write: create, the name of the role and the color you want",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        if (msg.author.id === msg.guild.ownerId) {
            const [role, name, color] = args;
            if (role === "create") {
                if (!name || !color)
                    return msg.reply("Please write the name and the color for the role");
                const user = client.users.cache.get(msg.guild.ownerId);
                msg.guild.roles.create({
                    name,
                    color,
                }).then((res) => user?.send(`The role ${res.name} was created`));
            }
            else {
                const sv = await schema_1.default.findOne({ id: String(msg.guild.id) });
                sv.roles = {
                    main: role
                };
                sv.save();
                msg.reply("Role seted");
            }
        }
        else {
            msg.reply("You do not have permissions to set the main role");
        }
        ;
    }
};
