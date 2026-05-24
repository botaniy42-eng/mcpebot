const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'botcahn106.aternos.me', // তোমার server address
  port: 46160,
  username: 'Botchan'
})

bot.on('spawn', () => {
  console.log('Bot joined server')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return

  const target = bot.players[username]?.entity
  if (!target) return

  // follow command
  if (message === 'fod') {
    bot.chat(`I am following ${username}`)
    followPlayer(target)
  }

  // attack command
  if (message === 'attack') {
    bot.chat(`Attacking ${username}`)
    attackPlayer(target)
  }
})

function followPlayer(target) {
  const interval = setInterval(() => {
    if (!target.position) return clearInterval(interval)

    bot.lookAt(target.position.offset(0, 1.6, 0))
    bot.setControlState('forward', true)
  }, 200)
}

function attackPlayer(target) {
  const interval = setInterval(() => {
    if (!target.position) return clearInterval(interval)

    bot.lookAt(target.position.offset(0, 1.6, 0))
    bot.attack(target)
  }, 500)
      }
