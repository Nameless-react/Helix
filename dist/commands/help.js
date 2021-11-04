"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "help",
    description: "Show all the commands",
    execute(client, msg, DMEmbed) {
        const id = msg.author.id;
        const user = client.users.cache.get(id);
        msg.guild.invites.create("900502275523506176", {
            unique: true,
            maxAge: 30
        }).then((rest) => {
            user.send({
                content: `Como estan todos aqui compañeros https://discord.gg/${rest.code}`,
                embeds: [DMEmbed(client)]
            });
        });
    }
};
