const tmi = require('tmi.js');
const generator = require('./textGenerator');

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
  }
});