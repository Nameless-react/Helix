import { MessageEmbed, MessageActionRow } from "discord.js";

export const WelcomeEmbed = (server) => {
    return new MessageEmbed()
        .setColor("#00ff00")
        .setTitle(`Welcome to ${server.guild.name}`)
        .setThumbnail(server.user.avatarURL({dynamic: true, size: 512}))
        .setAuthor(server.user.username, server.displayAvatarURL({dynamic: true, size: 300}))
} 


export const DMEmbed = (client) => {
    const embed = {
        color: "#ee069f",
        title: "Do you need help?\nHere are some commands",
        url: "https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor",
        thumbnail: client.user.avatarURL({dynamic: true, size: 512}),
        author:  {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL({dynamic: true, size: 300})
        },
        fields: []
    };

    client.application?.commands.cache.forEach(cmd => embed.fields.push({name: `${cmd.name}:`, value: `${cmd.description}`}))

    return embed
};

export const suggesEmbed = (content, author, img, msg) => {
    return new MessageEmbed()
        .setAuthor(`${author}`, img)
        .setColor("#00ff00")
        .setDescription(`Id:\n${msg.id}\nSuggestion:\n${content}`)
}


export const ProfileEmbed = (member, msg) => {
    let roles = []
    
    member.roles.cache.each((role) => {
        if (role.name === "@everyone") return
        roles.push(`<@&${role.id}>`)
    });
    
    const target = msg.mentions.users.first() || msg.author;
    const activities = member.presence?.activities[0]?.name;
    
    const status = member.presence?.status
    
    
    const embed = new MessageEmbed()
        .setTitle("Profile:")
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setThumbnail(target.displayAvatarURL({dynamic: true}))
        .addFields(
            { name: "Id:", value: `${member.user.id}` },
            { name: "Status:", value: `${status || "Offline"}` },
            { name: "Presence:", value: `${activities || "Doing Nothing"}`, inline: true },
            { name: "Time in guild:", value: `${moment(member.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment(member.joinedAt).startOf("day").fromNow()}**-**` },
            { name:"Account created:", value: `${moment(target.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-**${moment(target.createdAt).startOf("day").fromNow()}**-**` },    
            { name:"Roles:", value: `${roles.length === 0 ? "No roles" : roles.join("\n")}` },
        )
        .setColor("NOT_QUITE_BLACK")
    return embed
}

export const StatusEmbed = (content, author, img, status, reason, color, id, staff) => {
    return new MessageEmbed()
        .setAuthor(`${author}`, img)
        .setColor(color)
        .setDescription(`${content}\n
                        Id:\n${id}\n
                        Status:\n${status.toUpperCase()}\n
                        Because:\n${reason}\n
                        Staff:\n${staff}`)
};


export const BanEmbed = (list) => {
    const embed =  {
        title: "Ban list",
        color: "#ff0000",
        fields: []
    };
    list.forEach(data => embed.fields.push({ name: `User ${data.username}`, value: `Id: ${data.id},\n Reason: ${data.reason}`}));
 
    return embed
};

export const buttonTick = () => { 
    return new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId("Open")
        .setLabel("Open Ticket")
        .setStyle("PRIMARY")
        .setEmoji("🎫")
    )
}    


export const TickEmbed = (msg) => {
    return new MessageEmbed()
        .setTitle("Ticket 🎫")
        .setDescription(`This ticket allow you to talk with the staff in a private room`)
        .setColor("WHITE");
}