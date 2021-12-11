"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "autoRole",
    description: "Give a role to the user when he or she react with an emoji, to specify which role and which emoji, follow the next steps: before the name of the role write the @ and the emoji you want for",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        if (!msg.mentions)
            return msg.reply("Please provide a valid role");
        const { id } = msg.mentions.roles.first();
        const sv = await schema_1.default.insert({ id: String(msg.guild.id) }, {
            autoRole: {
                roles: [id],
                emojis: [args[1]]
            }
        });
        msg.reply("AutoRole set");
    }
};
