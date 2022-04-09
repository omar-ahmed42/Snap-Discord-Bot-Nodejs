async function banMember(msg){
    let guildMember = msg.mentions.members.first();
    if (!guildMember){
        msg.reply("Invalid or no mentioned member");
        return;
    }
    if (!guildMember.bannable){
        msg.reply("You cannot ban this member");
        return;
    }
    await guildMember.ban();
    let bannedURLs = ["https://tenor.com/view/banned-thanos-snap-gif-14785994", "https://tenor.com/view/banned-thor-gif-6072837"];
    const index = Math.floor(Math.random() * bannedURLs.length);
    msg.reply(bannedURLs[index]);
}

async function kickMember(msg){
    let guildMember = msg.mentions.members.first();
    if (!guildMember){
        msg.reply("Invalid or no mentioned member");
        return;
    }
    if (!guildMember.kickable){
        msg.reply("You cannot kick this member");
        return;
    }
    await guildMember.kick();
    let kickedURLs = ["https://tenor.com/bFEpB.gif", "https://tenor.com/bENKV.gif"];
    const index = Math.floor(Math.random() * kickedURLs.length);
    msg.reply(kickedURLs[index]);

}

module.exports = {
    kickMember,
    banMember
}
