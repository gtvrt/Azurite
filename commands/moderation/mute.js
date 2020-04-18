const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "mute",
    aliases: ["mt", "mute"],
    category: "moderation",
    description: "Mutes the annoying members.",
    usage: "<user> <reason>",
    run: (client, message, args) => {
        const logChannel = message.guild.channels.find(c => c.name === "admin-logs") || message.channel;
        const Memberrr = message.guild.roles.find(c => c.name === "Members");
        const lackofperms = new RichEmbed()
        .setColor("RED")
        .setTitle("**MISSING PERMISSIONS**")
        .setAuthor('Azurite BOT | Moderations', 'https://i.imgur.com/QklWiqQ.png')
        .addField("❌ You do not have permissions to execute this command!", "**Any problem please contact the owner!**")
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Failed to mute!', 'https://i.imgur.com/QklWiqQ.png');

        const lackofuser = new RichEmbed()
        .setColor("RED")
        .setTitle("**MISSING TARGET**")
        .setAuthor('Azurite BOT | Moderations', 'https://i.imgur.com/QklWiqQ.png')
        .addField("❌ Please enter the user you wanted to mute!", "**Fix: Add user in args[0]!**")
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Failed to mute!', 'https://i.imgur.com/QklWiqQ.png');

        const highranks = new RichEmbed()
        .setColor("RED")
        .setTitle("**ADMINISTRATOR**")
        .setAuthor('Azurite BOT | Moderations', 'https://i.imgur.com/QklWiqQ.png')
        .addField("❌ The user you mention is higher rank than me, I can't mute him/her!", "**Fix: Negative!**")
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Failed to mute!', 'https://i.imgur.com/QklWiqQ.png');

        if(!message.member.hasPermissions("MANAGE_ROLES") || !message.guild.owner) return message.reply(lackofperms)

        if(!message.guild.me.hasPermissions(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply(highranks)

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!mutee) return message.reply(lackofuser)

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reasons are given!"

        let mutedrole = message.guild.roles.find(r => r.name === "Muted")
        if(!mutedrole){
            try{
                message.guild.channels.forEach(async (channels, id) => {
                    mutedrole = await message.guild.createRole({
                        name: "Muted",
                        color: "#514f48",
                        permissions: []
                    })
                    await channels.overwritePermissions(mutedrole, {
                        SEND_MESSAGE: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    })
                })
            }catch(e){
                console.log(e.stack);
            }
        }

        const mutedsuccessdm = new RichEmbed()
        .setColor("GREEN")
        .setTitle("**YOU ARE MUTED**")
        .setAuthor('Azurite BOT | Moderations', 'https://i.imgur.com/QklWiqQ.png')
        .addField(`Hello, ${message.guild.name} you are muted!`, `**Reasons:** ${reason}`)
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Muted!', 'https://i.imgur.com/QklWiqQ.png');

        const mutedsuccess = new RichEmbed()
        .setColor("GREEN")
        .setTitle("**SUCCESS**")
        .setAuthor('Azurite BOT | Moderations', 'https://i.imgur.com/QklWiqQ.png')
        .addField(`${message.guild.name} is successfully being muted!`, `**Note: To unmute say ;unmute <user>**`)
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Muted!', 'https://i.imgur.com/QklWiqQ.png');

        const mutedlogs = new RichEmbed()
        .setColor("GREEN")
        .setTitle("**LOGS**")
        .setAuthor('Azurite BOT | Logs', 'https://i.imgur.com/QklWiqQ.png')
        .addField("Moderation:", "mute")
        .addField("User:", mutee.user.username)
        .addField("Muted By:", message.author.username)
        .addField("Date:", message.createdAt)
        .addField("Reasons:", reason)
        .setThumbnail('https://i.imgur.com/QklWiqQ.png')
        .setTimestamp()
        .setFooter('Azurite BOT | Muted!', 'https://i.imgur.com/QklWiqQ.png');

        if(mutee.roles.has(mutedrole)){
            message.reply("User has been muted already!")
        }

        mutee.addRole(mutedrole).then(() => {
            message.delete()
            mutee.removeRole(Memberrr)
            mutee.send(mutedsuccessdm)
            message.reply(mutedsuccess)
        })

        logChannel.send(mutedlogs)
    }
}
