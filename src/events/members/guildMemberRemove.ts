import * as Discord from 'discord.js';
import { Client } from '../../typings/discord';

import config from '../../../config/config';
import refreshActivity from '../../utils/refreshActivity';

export default async (client: Client, member: Discord.GuildMember) => {
    refreshActivity(client);

    const memberIsBanned = member.guild.bans.fetch().then(bans => bans.find(ban => ban.user.id === member.user.id));
    if (memberIsBanned) return;

    const sEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
        .setAuthor(`Member Left | ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL())
        .setColor(config.colors.red)
        .setDescription(`${member.user} left or was kicked from the server.`)
        .setTimestamp(new Date())
        .setFooter(config.footer);

    client.channels.fetch(config.logChannel).then((channel: Discord.TextChannel) => channel.send({ embeds: [sEmbed] }));
};
