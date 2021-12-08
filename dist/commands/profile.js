"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "profile",
    description: "Show some data about the specify user or himself",
    execute(client, msg, ProfileEmbed, args) {
        msg.channel.send({
            embeds: [ProfileEmbed(msg.member)]
        });
    }
};
