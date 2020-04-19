const { RichEmbed } = require("discord.js");

module.exports = {
    name: "request",
    category: "buyers",
    description: "Request the account to be whitelist.",
    usage: "<RbxUsername>",
    run: async (client, message, args) => {
        const requestlogs = message.guild.channels.find(c => c.name === "request") || message.channel;
        if (message.deletable) message.delete();

        const success = new RichEmbed()
        .setColor("GREEN")
        .setTitle("**Requested!**")
        .setAuthor('Azurite BOT | Buyers', 'https://i.imgur.com/QklWiqQ.png')
        .addField("✅ Your request has been sent!", "**Please wait while we will check everything for you!**")
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Requested successfully!', 'https://i.imgur.com/QklWiqQ.png');

        const failed = new RichEmbed()
        .setColor("RED")
        .setTitle("**Failed To Request**")
        .setAuthor('Azurite BOT | Buyers', 'https://i.imgur.com/QklWiqQ.png')
        .addField("❌ Please add your Roblox Username!", "**Usage:** ;request {RbxUsername}")
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Failed to request!', 'https://i.imgur.com/QklWiqQ.png');

        const requestlogger = new RichEmbed()
        .setColor("RED")
        .setTitle("**Whitelist Request**")
        .setAuthor('Azurite BOT | Buyers', 'https://i.imgur.com/QklWiqQ.png')
        .addField("User", message.author.username)
        .addField("Tag", message.author.tag)
        .addField("Roblox Username", args[0])
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Buyers Request!', 'https://i.imgur.com/QklWiqQ.png');

        if (!args[0]) {
            return message.reply(failed)
        }else{
            message.reply(success)
            requestlogs.send(requestlogger);
        }

        }
    }