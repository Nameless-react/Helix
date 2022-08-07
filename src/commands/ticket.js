export default {
    name: "ticket",
    description: "Create a channel where you can talk with someone of the staff temporarily",
    execute(client, msg, TickEmbed, buttonTick){
        msg.channel.send({
            embeds: [TickEmbed()],
            components: [buttonTick()]
        }).then(res => {
            setTimeout(() => {
                res.delete();
                msg.delete()
            }, 6000)
        });
    }
}