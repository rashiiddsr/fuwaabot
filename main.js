"use strict";
const { default: makeWASocket, DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState, makeInMemoryStore } = require('@adiwajshing/baileys');
const figlet = require('figlet');
const fs = require('fs');
const P = require('pino');
const ind = require('./help/ind');
const { color, FuwaaLog } = require('./lib/color');
let setting = JSON.parse(fs.readFileSync('./config.json'));
const store = makeInMemoryStore({ logger: P().child({ level: 'silent', stream: 'store' }) });

require('./message/fuwaa.js')
nocache('./message/fuwaa.js', module => console.log(color(`'${module} has been Changed!`)))

async function botStart() {
    const startBot = async () => {
        console.clear()
        console.log(color(figlet.textSync(setting.botName, { font: 'Standard', horizontalLayout: 'default', vertivalLayout: 'default', whitespaceBreak: false }), 'cyan' ))
    	console.log(color('[ ' + setting.botName + ' By RashiiddSr' + ' ]'))
	    const { state, saveCreds } = await useMultiFileAuthState(setting.sessionName)

	    const fuwaa = makeWASocket({ printQRInTerminal: true, logger: P({ level: 'silent' }), auth: state, browser: [ setting.botName + ' By RashiiddSrr', 'Safari', '3.0' ] })
	    fuwaa.multi = true
    	fuwaa.nopref = false
    	fuwaa.prefa = 'chik'
    	fuwaa.mode = 'public'
        fuwaa.spam = []

        store.bind(fuwaa.ev)

	    fuwaa.ev.on('messages.upsert', async m => {
		    if (!m.messages) return;
		    var msg = m.messages[0]
            if (msg.key && msg.key.remoteJid == "status@broadcast") return
		    require('./message/fuwaa')(fuwaa, msg, m, ind, setting)
	    })

	    fuwaa.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update
            if (connection === 'close') {
                console.log(FuwaaLog('Connection closed, trying to reconnect'))
                lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startBot() : console.log(FuwaaLog('Connection Logout'))
            }
        })

	    fuwaa.ev.on('creds.update', await saveCreds)
	
    }

    startBot()
    .catch(err => console.log(err))
}

function nocache(module, cb = () => { }) {
    console.log(color(`Module ${module} is monitored by sistem`))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
botStart()

