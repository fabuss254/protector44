
/* OPTIONS */

const ServerName = "Serveur Test Bot"
const DenyList = ["hacked", "hack", "hk", "nsfw","bite","chatte","cu","penis","batard","fuck","shit","merde"]

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
    if (message.mentions.everyone){
        if (message.member.roles.has(MemberRole)){
            message.member.send("Tu as été kick du server **TEST BOT** pour avoir **mentionnée @everyone**")
            message.member.kick("Utilise la mention everyone!")
        };
    };
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
                                
                                message.guild.createChannel('vcs-shadow', 'text', null, "Reinitialisation du serveur").then(chan => {
                                    chan.setParent(cat, "Reinitialisation du serveur");
                                });
                                message.guild.createChannel('règles', 'text', null, "Reinitialisation du serveur").then(chan => {
                                    chan.setParent(cat, "Reinitialisation du serveur");
                                    chan.send(`
                                    Voici quelque règles a respecter pour le bon fonctionnement du discord:\n
                                    \n
                                    1- Pas de NSFW\n
                                    2- Pas de bot NSFW\n
                                    3- Ne pas perturber les autres membres\n
                                    4- Respectez tout les membres du discord\n
                                    5- Ne pas DDOS, ou DOX\n
                                    6- Ne pas partager d'informations personnelles\n
                                    \n
                                    __**INFO**__\n
                                    \n
                                    Ce discord est reset règulièrement, ne vous plaignez pas si vos salon sont reinitialisée, ainsi que les roles/emoji/webhook etc...\n
                                    \n
                                    Et surtout, amusez vous =)
                                    `)
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
                            
                            message.guild.setName(ServerName);
                            message.guild.setRegion("eu-central");
                            message.guild.setAFKTimeout(300);
                            message.guild.setIcon("./wLBF7RUE.jpg");
                            message.guild.setVerificationLevel(2);
                            
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

bot.on("guildUpdate", guild => {
    guild.setName(ServerName);
    guild.setRegion("eu-central");
    guild.setAFKTimeout(300);
    guild.setIcon("./wLBF7RUE.jpg");
    guild.setVerificationLevel(2);
    
    /*
    guild.fetchAuditLogs({type: "GUILD_UPDATE", limit: 10}).then(audit => {
        var finished = 0;
        audit.entries.forEach(function(v,i){
            if (finished == 0){
                if (v.executor.id != "462669402869989386"){
                    v.executor.send("Don't try to change the servers settings, this warning has been sent to your violation list, after 10 violations, you'll be **permanently banned!**")
                };
            };
        });
    });
    */
});

bot.on("guildBanRemove", (guild, user) => {
    guild.ban(user, {reason: 'Debanned by a user | lost normal reason of deban'})
});

bot.login(process.env.TOKEN);
console.log("Login succesfully!");

bot.on("error", err => {
    console.log(err);
});
