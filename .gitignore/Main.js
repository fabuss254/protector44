

/* VARIABLES */

const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

var prefix = "&";
var footer = "Createur Fabuss254#9232";

var bot = new Discord.Client();

const MemberRole = "458316243015827456"
const ModRole = "462660306959728642"
const OwnerRole = "462661649502044161"

/* EVENEMENT */

bot.on("ready", ()=> {
    console.log("Bot ready to be use!");
    
    var start_embed = new Discord.RichEmbed()
        .setColor("#FFFFFF")
        .addField("Bot Started!", "Start time:")
    bot.users.get("178131193768706048").send(start_embed);
    
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;
    var args = message.content.substring(prefix.length).split (" ");
    if (!message.content.startsWith(prefix)) return;
    switch (args[0].toLowerCase()) {
        
        case "say":
            if (message.author.id === "178131193768706048"){
                message.channel.send(message.content.substring(5,message.content.length));
                message.delete(100);
            }else{
                message.channel.send("<@" + message.member.id + ">, Vous n'avez pas la permission de faire cette commande!").then(msg => msg.delete(5000));
                message.delete(100);
            }
            break;
            
        case "reset":
            if (message.author.id === "178131193768706048"){
                    message.channel.send("Etes vous sur?").then(msg => {
                        msg.createReactionCollector((reaction, user) => reaction.emoji.name === '✅' && user.id === '178131193768706048', { time: 5000 }).on('collect', (reaction, collector) => {
                            var AllChannels = message.guild.channels
                            
                            message.guild.createChannel('Salons textuels', 'category', null, "Reinitialisation du serveur").then(cat => {
                                message.guild.createChannel('général', 'text', null, "Reinitialisation du serveur").then(chan => {
                                    chan.send("Le serveur vient d'être reinitialiser, cela arrive souvent, les roles/channels/emoji/Server setting ont tous été reinitialisée!");
                                    chan.setParent(cat, "Reinitialisation du serveur");
                                    message.guild.setSystemChannel(chan, "Reinitialisation du serveur");
                                });
                            });
                            
                            message.guild.createChannel('Salons vocaux', 'category', null, "Reinitialisation du serveur").then(cat => {
                                message.guild.createChannel('Général', 'voice', null, "Reinitialisation du serveur").then(chan => {
                                    chan.setParent(cat, "Reinitialisation du serveur");
                                    message.guild.setAFKChannel(chan, "Reinitialisation du serveur")
                                });
                            });
                            
                            
                            AllChannels.forEach(function(value){
                              value.delete();
                            });
                            
                            message.guild.setName("Serveur full admin");
                            message.guild.setRegion("eu-central");
                            message.guild.setAFKTimeout(300);
                            message.guild.setIcon("./wLBF7RUE.jpg");
                            
                            var emojilist = message.guild.emojis
                            emojilist.forEach(function(value){
                              message.guild.deleteEmoji(value);
                            });
                            
                            var rolelist = message.guild.roles
                            rolelist.forEach(function(value){
                                if (value.id != "462666906931822602" && value.id != "462661649502044161" && value.id != "458316243015827456" && value.id != "462660306959728642"){
                                    value.delete();
                                };
                            });
                            
                        });
                        msg.react('✅');
                    });     
            }else{
                message.channel.send("<@" + message.member.id + ">, Vous n'avez pas la permission de faire cette commande!").then(msg => msg.delete(5000));
                message.delete(100);
            }
            break;
    }
});

bot.on("guildMemberAdd", member => {
    member.addRole(member.guild.roles.get(MemberRole));
});

bot.login(process.env.TOKEN);
console.log("Login succesfully!");

bot.on("error", err => {
    console.log(err);
});
