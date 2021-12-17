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
        if (msg.member?.permissions.has(["KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_MESSAGES", "MANAGE_CHANNELS"]) || msg.member?.permissions.has("MANAGE_GUILD")) {
            if (args.length === 0)
                return msg.reply("Please provide data");
            if (!msg.mentions)
                return msg.reply("Please provide a valid role");
            const { id } = msg.mentions.roles.first();
            const [query, , emoji] = args;
            if (query === "add") {
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    $push: { "autoRole.roles": id, "autoRole.emojis": emoji }
                });
                msg.reply("AutoRole added");
            }
            else if (query === "delete") {
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    $pull: { "autoRole.roles": id, "autoRole.emojis": emoji }
                });
                msg.reply("AutoRole deleted");
            }
        }
        else {
            msg.reply("You do not have permissions to execute this command");
        }
    }
};
