const { discord, RichEmbed } = require("discord.js");
module.exports = {
    name: "redhalo",
    category: "halos",
    description: "How to get a red halo?",
    run: async (client, message, args) => {

        var redhalo = new RichEmbed()
            .setDescription("Red Halo")
            .setColor("#003bff")
            .addField("Halo:", "Red")
            .addField("Ways to get:", "Finish THE Tower of hell which has all stages.")
            .setAuthor("Halo Grinders | Red Halo", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256")
            .setTimestamp()
            .setFooter("Halo Grinders | Red Halo", "https://cdn.discordapp.com/icons/709007697626005566/6d2b1f1882f674e06a41280dbb0e970c.png?size=256");


        message.channel.send(redhalo);
        }
    }
    
