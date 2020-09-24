const Discord = require('discord.js');
const {
	prefix,
	token,
	alliance1,
	alliance2
} = require('./config.json');

//Dependencies
const fs = require('fs');

//Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

//Dynamic Command Handler
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			cmd => cmd.aliases && cmd.aliases.includes(commandName)
		);

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply("I can't execute that command inside DMs!");
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
				command.usage
			}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`Please wait ${timeLeft.toFixed(
					1
				)} more second(s) before reusing the \`${command.name}\` command.`
			);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

//Bot Status
client.on('ready', () => {
	setInterval(() => {
		const alliance_list = [alliance1, alliance2]; //Alliances
		const aIndex = Math.floor(Math.random() * alliance_list.length);

		const activities_list = [
			'with our Alliances',
			`Shoutout to ${alliance_list[aIndex]}`
		]; // Status Phrases
		const sIndex = Math.floor(Math.random() * activities_list.length);
		client.user.setActivity('<activity>', { type: 'PLAYING' });
		client.user.setActivity(activities_list[sIndex]);
	}, 10000); // Runs this every 10 seconds.
});

//Login
client.login(token).then(token => {
	if (token) {
		console.log(
			'\x1b[34mDiscord:\x1b[0m Logged in with token',
			'\x1b[33m' + token,
			'\x1b[0m'
		);
		console.log('---');
		console.log('\x1b[36m%s\x1b[0m', `${client.user.username} Running!`);
		console.log(
			'\x1b[36m%s\x1b[0m',
			`${client.guilds.cache.size} Guilds | ${
				client.channels.cache.size
			} Channels | ${client.users.cache.size} Users`
		);
		console.log('\x1b[36m%s\x1b[0m', 'Prefix: ' + prefix);
		console.log(
			'\x1b[36m%s\x1b[0m',
			'Bot Issue Form: https://forms.gle/YNKWgAK5FP9u5eEz7'
		);
		console.log('---');
	} else {
		console.log(
			'\x1b[34mDiscord:\x1b[0m An error occured while logging in:',
			err
		);
		process.exit(1);
	}
});
