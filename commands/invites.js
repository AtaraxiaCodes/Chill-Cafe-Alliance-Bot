const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invites',
	description: 'Displays link to Join Our Allies',
	execute(message, args) {
		const { inviteLink, alliance1link } = require('../config.json');

		let inviteEmbed = new MessageEmbed()
			.setTitle(`Invite Link`)
			.setColor('#00F0F0')
			.setFooter(message.guild.name)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp()
			.addFields(
				{ name:`Chill Cafe:`, value: inviteLink, inline: true },
				{ name:`The Dog Chromezone:`, value: alliance1link, inline: true },
			)
		message.channel.send(inviteEmbed);
	}
};
