"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "cc",
    description: "Clears the amount of messages that we want",
    execute: async (client, msg, args) => {
        if (msg.member?.permissions.has("MANAGE_MESSAGES")) {
            let amount;
            if (args.length === 0)
                amount = 1;
            amount = parseInt(args[0]);
            if (msg) {
                await msg.delete();
            }
            ;
            const { size } = await msg.channel.bulkDelete(amount, true);
            msg.channel.send(`Deleted ${size} message(s)`);
        }
        else {
            msg.channel.send("You do not have permissions to execute this command");
        }
    }
};
