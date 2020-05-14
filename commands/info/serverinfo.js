const { discord, RichEmbed } = require("discord.js");
module.exports = {
    name: "serverinfo",
    category: "info",
    description: "Shows the server's info.",
    run: async (client, message, args) => {

        var serverEmbed = new RichEmbed()
            .setDescription("Server Info")
            .setColor("#003bff")
            .addField("Bot name:", client.user.username)
            .addField("Total Members:", message.guild.memberCount)
            .setAuthor("Halo Grinders | Info", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256")
            .setTimestamp()
            .setFooter("Halo Grinders | Info", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256");




        message.channel.send(serverEmbed);
        }
    }
    