const tmi = require('tmi.js');
const generator = require('../textGenerator');
const { ApiClient } = require('twitch');

const reputation ={};
const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: 'MarvelBot9876',
    password: 'npjb8vlxmjk8xwbrg5d14qaynt57ur'
  },
  channels: [ 'marvelman3284' ]
});

client.connect();

function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}

function getTime() {
    d = new Date()
    return d.toLocaleTimeString()
}

client.on('message', (channel, tags, message, self) => {
  if(self || !message.startsWith('!')) {
    return;
  }

  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  if(command === 'hello') {
    client.say(channel, `@${tags.username}, Yo what's up`);
  } else if(command === 'generate') {
    (async () => {
      const prompt = args.join(' ');
      client.say(channel, `@${tags.username}, ${await generator.generate(prompt)}`);
    })();
  } else if (command === 'roll') {
      const num = rollDice();
      client.say(channel, `@${tags.username}, You rolled a ${num}`)
  } else if (command === 'time') {
      const time = getTime();
      client.say(channel, `@${tags.username}, The current time for Marvel is ${time} EST`)

  }
});

