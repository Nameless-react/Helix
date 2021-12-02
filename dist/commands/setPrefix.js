"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../DB");
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "setprefix",
    description: "Change the predetermined prefix to anyone you want",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        if (msg.author.id === msg.guild.ownerId) {
            const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                prefix: args[0]
            });
        }
        else {
            msg.reply("You do not have permissions to change the prefix");
        }
        ;
    }
};
