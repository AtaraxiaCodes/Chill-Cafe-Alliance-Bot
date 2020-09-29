const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'alliances',
	description: 'Lists all servers allied to Chill Cafe',
	execute(message, args) {
		const { alliance1 } = require('../config.json');

		let allyEmbed = new MessageEmbed()
			.setTitle(`Allied With:`)
			.setColor('#00F0F0')
			.setThumbnail(message.author.avatarURL())
			.setFooter(message.guild.name)
			.setTimestamp()
			.addField('Servers -', alliance1);
		message.channel.send(allyEmbed);
	}
};
