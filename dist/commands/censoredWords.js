"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "censoredWord",
    description: "Specify which words you want to censor",
    execute: async (client, msg, args) => {
        if (args.length === 0)
            return msg.reply("Please provide the data");
        const [query, word] = args;
        if (query == "add") {
            const sv = schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                $push: {
                    censoredWord: word
                }
            });
            msg.reply("Word added");
        }
        else if (query === "delete") {
            const sv = schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                $pull: {
                    censoredWord: word
                }
            });
            msg.reply("Word deleted");
        }
        ;
    }
};
