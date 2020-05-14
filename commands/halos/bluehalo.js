  
const { discord, RichEmbed } = require("discord.js");
module.exports = {
    name: "bluehalo",
    category: "halos",
    description: "How to get a blue halo?",
    run: async (client, message, args) => {

        var bluehalo = new RichEmbed()
            .setDescription("Blue Halo")
            .setColor("#BB0A1E")
            .addField("Halo:", "Blue")
            .addField("Ways to get:", "Finish 169 stages and get the explorer badge.")
            .setAuthor("Halo Grinders | Red Halo", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256")
            .setTimestamp()
            .setFooter("Halo Grinders | Red Halo", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256");


        message.channel.send(bluehalo);
        }
    }
