const {Intents, Client, Permissions } = require('discord.js')
const {sendJoke} = require("./handlers/jokehandler");
const {sendQuote} = require("./handlers/quotehandler");
const {sendGIF} = require("./handlers/gifhandler");
const {banMember, kickMember} = require("./handlers/GuildMemberHandler");
const {checkMemberPermissions} = require("./utils/permissions");
const {deleteMessages} = require("./handlers/messagehandler");
const express = require('express');
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS ]});

const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})
server.listen(3000, ()=>{console.log("Server is Ready!")});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', readyDiscord);
client.on('message', gotMessage)

function readyDiscord(){
    console.log('DISCORD READY');
}

function gotMessage(msg){
        handleCommands(msg);
}

function handleCommands(msg){
    if(!msg.content.startsWith('!')){
        return;
    }
    let content = msg.content.match(/(?:[^\s"]+|"[^"]*")+/g);
    let commandToken = content[0];
    content.shift();
    switch (commandToken) {
        case '!gif':
            sendGIF(msg, content);
            break;
        case '!quote':
            sendQuote(msg);
            break;
        case '!joke':
            sendJoke(msg, content);
            break;
        case '!delete':
            if (!checkMemberPermissions(msg.member, Permissions.FLAGS.MANAGE_MESSAGES)){
                msg.reply("You do not have permission to delete messages");
                return;
            }
            deleteMessages(msg.channel, content) ;
            break;
        case '!ban':
            if (!checkMemberPermissions(msg.member, Permissions.FLAGS.BAN_MEMBERS)){
                msg.reply("You do not have permission to ban members");
                return;
            }
            banMember(msg);
            break;
        case '!kick':
            if (!checkMemberPermissions(msg.member, Permissions.FLAGS.KICK_MEMBERS)){
                msg.reply("You do not have permission to kick members");
                return;
            }
            kickMember(msg);
            break;
    }

}
