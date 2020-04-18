const { Client, Collection, RichEmbed, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    console.log(`${client.user.username} is online!`);
    const keys = client.guilds.keys(client.guilds);
    for(const key of keys){


    console.log(`SERVER: ${client.guilds.get(key).name} Ready!`)

    }

    rpc();
    function rpc() {
        client.user.setStatus('dnd')

        client.user.setActivity(';help', {type: 'LISTENING'});
        setTimeout(function () {

            client.user.setActivity('Azurite', {type: 'WATCHING'});
            setTimeout(function () {
                
                client.user.setActivity(`${client.guilds.size} Servers`, {type: 'WATCHING'});
                setTimeout(function () {

                client.user.setActivity(`${client.users.size} Members`, {type: 'WATCHING'});

                    setTimeout(function(y) {
                        rpc();
                    }, 5000);
                }, 5000);
            }, 5000);
        }, 5000);
    }
    console.log(`[Discord] Connected to discord as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
    console.log('User' + member.user.username + " has joined to the server!")
    console.log(member)
    const joinlogs = new RichEmbed()
    .setAuthor('Azurite BOT | Logs', 'https://i.imgur.com/QklWiqQ.png')
    .setDescription('Hi, ' + member.user.username + '. Welcome to Azurite | Community. Please read the rules before accessing eah channel.')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Azurite BOT | Join Logs!', member.user.displayAvatarURL);
    member.guild.channels.get('700291005714399232').send({embed: joinlogs})
    const join = new RichEmbed()
    .setAuthor('Azurite BOT | Logs', 'https://i.imgur.com/QklWiqQ.png')
    .setDescription(member.user.username + ' has joined ')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Azurite BOT | Join Logs!', member.user.displayAvatarURL);
    member.guild.channels.get('700315300717002812').send({embed: join})
});

client.on('guildMemberRemove', member => {
    console.log('User' + member.user.username + " has left to the server!")
    console.log(member)
    const leavelogs = new RichEmbed()
    .setAuthor('Azurite BOT | Logs', 'https://i.imgur.com/QklWiqQ.png')
    .setDescription('Bye, ' + member.user.username + ' thanks for coming, and dont come back!')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Azurite BOT | Join Logs!', member.user.displayAvatarURL);
    member.guild.channels.get('700291005714399232').send({embed: leavelogs})
    const leave = new RichEmbed()
    .setAuthor('Azurite BOT | Logs', 'https://i.imgur.com/QklWiqQ.png')
    .setDescription(member.user.username + ' has left the server!')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Azurite BOT | Join Logs!', member.user.displayAvatarURL);
    member.guild.channels.get('700315300717002812').send({embed: leave})
});

client.on("message", async message => {
    const prefix = ";";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login("NjkyOTQxMTc1NjAyMjgyNTQ3.XppT6w.e0aYvVGaKn1gTklypQwsUlE-T64");
