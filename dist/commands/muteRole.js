"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../DB");
const schema_1 = __importDefault(require("../schema"));
exports.default = {
    name: "muteRole",
    description: "Set the mute role of the guild or create it. To create the role, write: create, the name and the color you want. Before the names of the roles write @ ",
    execute: async (client, msg, args, cleanId) => {
        if (args.length === 0)
            return msg.reply("Please provide data");
        if (msg.author.id === msg.guild.ownerId) {
            const [role, name, color] = args;
            if (role === "create") {
                const user = client.users.cache.get(msg.guild.ownerId);
                msg.guild.roles.create({
                    name,
                    color,
                }).then(async (res) => {
                    user?.send(`The role ${res.name} was created`);
                    msg.guild.channels.cache.each((channel) => channel.permissionOverwrites.create(res.id, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        MUTE_MEMBERS: false,
                        SEND_MESSAGES_IN_THREADS: false,
                        READ_MESSAGE_HISTORY: false
                    }));
                    msg.guild.roles.setPositions([{
                            role: res.id,
                            position: -1
                        }]);
                    const bsv = await schema_1.default.findOne({ id: String(msg.guild.id) });
                    const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                        roles: {
                            main: bsv.roles.main,
                            mute: res.id,
                        }
                    });
                });
                msg.reply("Role seted");
            }
            else {
                const roleId = cleanId("!", role, msg);
                const bsv = await schema_1.default.findOne({ id: String(msg.guild.id) });
                const sv = await schema_1.default.updateOne({ id: String(msg.guild.id) }, {
                    roles: {
                        main: bsv.roles.main,
                        mute: roleId,
                    }
                });
                msg.reply("Role seted");
            }
            ;
        }
        else {
            msg.reply("You do not have permissions to set the mute role");
        }
    }
};
