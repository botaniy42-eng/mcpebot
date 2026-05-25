const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')

const bots = []
const BOT_COUNT = 3 // কয়টা bot চাই

function createBot(name) {
        const bot = mineflayer.createBot({
                host: 'botcahn106.aternos.me',
                port: 46160,
                username: name
        })
        
        bot.loadPlugin(pathfinder)
        
        bot.once('spawn', () => {
                console.log(`✅ ${name} joined!`)
        })
        
        bot.on('chat', (username, message) => {
                if (username === bot.username) return
                
                const target = bot.players[username]?.entity
                if (!target) return
                
                // FOLLOW ALL
                if (message === 'fod') {
                        bots.forEach(b => follow(b, target))
                }
                
                // ATTACK ALL
                if (message === 'atk') {
                        bots.forEach(b => attack(b, target))
                }
        })
        
        bot.on('end', () => {
                console.log(`❌ ${name} disconnected! Reconnecting...`)
                setTimeout(() => createBot(name), 5000)
        })
        
        bot.on('error', err => console.log(`${name}:`, err))
        
        bots.push(bot)
}

// FOLLOW FUNCTION
function follow(bot, target) {
        const mcData = require('minecraft-data')(bot.version)
        const movements = new Movements(bot, mcData)
        
        bot.pathfinder.setMovements(movements)
        bot.pathfinder.setGoal(new goals.GoalFollow(target, 1), true)
}

// ATTACK FUNCTION
function attack(bot, target) {
        bot.attack(target)
}

// CREATE MULTIPLE BOTS
for (let i = 0; i < BOT_COUNT; i++) {
        setTimeout(() => {
                createBot("Bot_" + i)
        }, i * 3000) // delay join
                                           }
