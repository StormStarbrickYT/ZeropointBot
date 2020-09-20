const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const User = require(`../models/user.model`);

module.exports = {
    name: `ban`,
    description: `Ban a user.`,
    usage: `<user>`,
    aliases: null,
    category: `moderation`
}

let rolePerms = [`ENFORCEMENT TIME`, `Founder`, `Staff`, `Security`];

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    if(!config.developerIDs.includes(message.author.id) && !message.member.roles.some(r => rolePerms.includes(r.name))) return message.channel.send(`${m} You can't use that!`);

    let banMember;
    if(args[0]) {
        banMember = message.mentions.members.first();
        if(!banMember) {
            banMember = args[0];
            if(isNaN(parseInt(banMember))) return message.channel.send(`${m} That is an invalid user ID!`);
            banMember = await message.guild.members.get(banMember);
        }
    }

    if(!banMember && isNaN(parseInt(args[0]))) return message.channel.send(`${m} Please specify a valid member of this server!`);
    else if(config.developerIDs.includes(banMember.id) || !banMember.bannable || (banMember.roles.some(r => rolePerms.includes(r.name)))) return message.channel.send(`${message.author} That user is a mod / admin.`);

    let banReason = args.slice(1).join(` `) || `No reason provided.`;

    banMember.send(`You were banned from **${message.guild.name}** for **${banReason}**.`).catch(err => console.log(err));

    await banMember.ban(banReason).catch(err => {
        message.channel.send(`Failed to ban ${banMember}. Please contact a developer.`);
        console.error(err);
    }).then(() => {
        message.delete();
        message.channel.send(`**${banMember.user.tag}** was banned: **${banReason}**.`);
    });
}