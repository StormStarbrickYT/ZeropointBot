import config from '../../../config/config';

import * as Discord from 'discord.js';
import { Client, CommandConfig } from '../../types/discord';

import { FieldsEmbed } from 'discord-paginationembed';
import { cleanse } from '../../utils/functions';

const cmd: CommandConfig = {
    desc: `View the song queue.`,
    aliases: [`q`],
    category: `music`
};

const run = async (client: Client, message: Discord.Message, args: string[]) => {
    const m = `${message.author} »`;

    if (!message.member.voice.channel) return message.channel.send(`${m} You must be in a voice channel to use this!`);
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${m} You must be in the same voice channel as me to use this!`);

    if (!client.player.isPlaying(message)) message.channel.send(`${m} There is no song currently playing!`);

    const queue = client.player.getQueue(message);

    const queueEmbed = new FieldsEmbed()
        .setArray(queue.tracks.map((tracks, i) => `${i === 0 ? `\`Current\`` : `${i + 1}`}: **${cleanse(tracks.author)} - ${cleanse(tracks.title)}**`))
        .setAuthorizedUsers([message.author.id])
        .setChannel((message.channel as Discord.TextChannel))
        .setElementsPerPage(10)
        .setPage(1)
        .setPageIndicator(true)
        .setDeleteOnTimeout(true)
        .setDisabledNavigationEmojis([`delete`]);

    queueEmbed.embed
        .setAuthor(`Server Queue`, message.guild.iconURL())
        .setTimestamp(new Date())
        .setFooter(config.footer);

    message.reply(queueEmbed);
};

export {
    cmd,
    run
};
