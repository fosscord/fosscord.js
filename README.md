<div align="center">
  <br />
    <img width="100" src="https://raw.githubusercontent.com/fosscord/fosscord/master/assets/logo_big_transparent.png" />
</p>
<h1 align="center">Fosscord.JS</h1>

<p>
   <a href="https://discord.gg/ZrnGQP6p3d">
    <img src="https://img.shields.io/discord/806142446094385153?color=7489d5&logo=discord&logoColor=ffffff" />
  </a>
  <img src="https://img.shields.io/static/v1?label=Status&message=Development&color=blue">
  <a title="Crowdin" target="_blank" href="https://translate.fosscord.com/"><img src="https://badges.crowdin.net/fosscord/localized.svg"></a>
  <a href="https://opencollective.com/fosscord">
    <img src="https://opencollective.com/fosscord/tiers/badge.svg">
  </a>
</div>

## About

fosscord.js is a fork of [discord.js](https://discord.js.org/) that allows you to easily interact with the
[Fosscord API](https://docs.fosscord.com/) and is backwards compatible to discord.js.

### Discord.js

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Fosscord API

### Additions

- User only features (video/screenshare)
- Voice support for browser

## Installation

**Node.js 16.6.0 or newer is required.**

```sh-session
npm install fosscord.js
yarn add fosscord.js
pnpm add fosscord.js
```

Without voice support: `npm install fosscord.js`  
With voice support ([@discordjs/opus](https://www.npmjs.com/package/@discordjs/opus)): `npm install fosscord.js @discordjs/opus`  
With voice support ([opusscript](https://www.npmjs.com/package/opusscript)): `npm install fosscord.js opusscript`

### Audio engines

The preferred audio engine is @discordjs/opus, as it performs significantly better than opusscript. When both are available, fosscord.js will automatically choose @discordjs/opus.
Using opusscript is only recommended for development environments where @discordjs/opus is tough to get working.
For production bots, using @discordjs/opus should be considered a necessity, especially if they're going to be running on multiple servers.

### Optional packages

- [zlib-sync](https://www.npmjs.com/package/zlib-sync) for WebSocket data compression and inflation (`npm install zlib-sync`)
- [erlpack](https://github.com/discord/erlpack) for significantly faster WebSocket data (de)serialisation (`npm install discord/erlpack`)
- [bufferutil](https://www.npmjs.com/package/bufferutil) for a much faster WebSocket connection (`npm install bufferutil`)
- [utf-8-validate](https://www.npmjs.com/package/utf-8-validate) in combination with `bufferutil` for much faster WebSocket processing (`npm install utf-8-validate`)
- [@discordjs/voice](https://github.com/discordjs/voice) for interacting with the Discord Voice API

## Example usage

Install all required dependencies:

```sh-session
npm install fosscord.js @discordjs/rest discord-api-types
yarn add fosscord.js @discordjs/rest discord-api-types
pnpm add fosscord.js @discordjs/rest discord-api-types
```

Register a slash command against the Discord API:

```js
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '9' }).setToken('token');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
```

Afterwards we can create a quite simple example bot:

```js
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login('token');
```

## Links

- [Website](https://fosscord.com/) ([source](https://github.com/fosscord/fosscord-landingpage))
- [Documentation](https://docs.fosscord.com) ([source](https://github.com/fosscord/fosscord-docs))
- [Fosscord Discord server](https://discord.gg/ZrnGQP6p3d)
- [Discord.js Guide](https://discordjs.guide/) ([source](https://github.com/discordjs/guide)) - this is still for stable
- [Discord.js Discord server](https://discord.gg/djs)
- [GitHub](https://github.com/fosscord/fosscord.js)
- [NPM](https://www.npmjs.com/package/fosscord.js)

### Extensions

- [RPC](https://www.npmjs.com/package/discord-rpc) ([source](https://github.com/discordjs/RPC))

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation](https://discord.js.org/#/docs).  
See [the contribution guide](https://github.com/discordjs/discord.js/blob/main/.github/CONTRIBUTING.md) if you'd like to submit a PR.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [fossccord.js Server](https://discord.gg/ZrnGQP6p3d).
