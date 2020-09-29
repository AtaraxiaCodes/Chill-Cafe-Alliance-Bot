const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'info',
	description: 'Bot Information',
	execute(message, args) {
		let info1 = `v1.2.0`;
		let info2 = `Node v12`;
		let info3 = `Discord.js v12`;
		let info4 = `AtaraxiaPlayz#8257`;

		let botEmbed = new MessageEmbed()
			.setTitle('Bot Information')
			.setColor('#00F0F0')
			.setFooter(message.guild.name)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp()
			.addField(`Version:`, info1, true)
			.addField(`Node Version:`, info2, true)
			.addField(`Coded in:`, info3, true)
			.setDescription(`Bot Developed by: ${info4}`);
		message.channel.send(botEmbed);
	}
};
