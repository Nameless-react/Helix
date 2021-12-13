"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "crole",
    description: "Assign the channel for the roles",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
            $set: {
                "channelRole": args[0]
            }
        });
        msg.reply("Channel seted");
    }
};
