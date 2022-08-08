export default {
    name: "8ball",
    description: "Gives a random answser to your questions",
    execute(client, msg, args) {
        if (args.length === 0) return msg.reply("Please ask a question")
        const answers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", " Most likely", "Outlook good", "Yes", "No", "Signs point to yes", "Reply hazy, try again", "Ask again later", " Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "Outlook not so good", "Very doubtful", "My sources say no"];
        
        msg.reply(`${answers[Math.floor(Math.random() * answers.length)]}`)
    }
}