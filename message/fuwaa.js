"use strict";

//Module
const { downloadContentFromMessage, generateWAMessageFromContent } = require("@adiwajshing/baileys");
const fs = require("fs");
const PhoneNumber = require('awesome-phonenumber')
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const axios = require('axios')
const google = require('google-it');

//Library
const { color, bgcolor } = require("../lib/color");
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep } = require("../lib/myfunc");
const { upload } = require("../lib/uploader");
const { } = require("../lib/downloader")

//Database


//stat
let hit = []


moment.tz.setDefault("Asia/Jakarta").locale("id");
     
module.exports = async(fuwaa, msg, m, ind, setting) => {
    try {
        let { ownerNumber, botName, pathImg } = setting
        const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('DD/MM/YY HH:mm:ss z')
        const salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
        const fromMe = msg.key.fromMe
    	const from = msg.key.remoteJid
    	const type = msg.message ? Object.keys(msg.message)[0] : ''
        const content = JSON.stringify(msg.message)
        const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : ""
        if (fuwaa.multi){
		    var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓=|!?#%^&.,\/\\©^]/gi) : '#'
        } else {
            if (fuwaa.nopref){
                prefix = ''
            } else {
                prefix = fuwaa.prefa
            }
        }
    	const args = chats.split(' ')
    	const command = chats.toLowerCase().split(' ')[0] || ''
        const isGroup = msg.key.remoteJid.endsWith('@g.us')
        const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
        const pushname = msg.pushName
        const isCmd = command.startsWith(prefix)
        const q = chats.slice(command.length + 1, chats.length)
        const isBaileys = (msg.key.id.startsWith('3EB0') && msg.key.id.length === 12) ? true : (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16)
        const body = chats.startsWith(prefix) ? chats : ''
        const botNumber = fuwaa.user.id.split(':')[0] + '@s.whatsapp.net'
        const groupMetadata = isGroup ? await fuwaa.groupMetadata(from) : ''
    	const groupName = isGroup ? groupMetadata.subject : ''
    	const groupId = isGroup ? groupMetadata.id : ''
    	const groupMembers = isGroup ? groupMetadata.participants : ''
    	const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
    	const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    	const isGroupAdmins = groupAdmins.includes(sender) || false
        const isOwner = ownerNumber.includes(sender)

	    const isUrl = (uri) => {
	        return uri.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
	    }
        const jsonformat = (json) => {
            return JSON.stringify(json, null, 2)
        }
        
        //statt
        let statUser = `┌──「 *𝗦𝗧𝗔𝗧𝗨𝗦 𝗨𝗦𝗘𝗥* 」\n│❏ *Name* : *${pushname}* \n│❏ *Your API* :\n│ 「 *https://wa.me/${sender.split('@')[0]}* 」\n└──「 *FUWABOT* 」\n\n`
        let listCommands = ['infomenu', 'ownermenu', 'groupmenu', 'weebsmenu', 'miscmenu', 'mediamenu', 'downmenu']

        //Validate
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isSticker = (type == 'stickerMessage')
        const isViewOnce = isGroup ? (type == 'viewOnceMessage') : (type == 'messageContextInfo')
        const isQuotedMsg = (type == 'extendedTextMessage')
        const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
        const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
        const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
        const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
        const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false
        const isQuotedContact = isQuotedMsg ? content.includes('contactMessage') ? true : false : false

        //Function 
     	const downloadAndSaveMediaMessage = async(mediatype, filename = 'undefined') => {
            return new Promise(async (resolve, reject) => {
                let stream
                if (msg.message.extendedTextMessage == null) stream = await downloadContentFromMessage(msg.message[mediatype + 'Message'], mediatype)
                else stream = await downloadContentFromMessage(msg.message.extendedTextMessage.contextInfo.quotedMessage[mediatype + 'Message'], mediatype)
                let buffer = Buffer.from([])
                for await(const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                fs.writeFileSync(filename, buffer)
                resolve(filename)
            })
        }
        const reply = (teks, men) => {
             return fuwaa.sendMessage(from, { text: teks, mentions: men ? men : [] }, { quoted: msg })
        }
        const sendMess = (from, teks) => {
             return fuwaa.sendMessage(from, { text: teks })
        }
        const sendContact = (jid, numbers, name, quoted, men) => {
            let number = numbers.replace(/[^0-9]/g, '')
            const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:' + name + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            return fuwaa.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
        }
        const sendFileFromUrl = async (from, url, caption, msg, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return fuwaa.sendMessage(from, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: msg})
                }
            let type = mime.split("/")[0]+"Message"
            if(mime.split("/")[0] === "image"){
                return fuwaa.sendMessage(from, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            } else if(mime.split("/")[0] === "video"){
                return fuwaa.sendMessage(from, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: msg})
            } else if(mime.split("/")[0] === "audio"){
                return fuwaa.sendMessage(from, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: msg })
            } else {
                return fuwaa.sendMessage(from, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: msg })
            }
        }
        const sendImg = (from, path, caption, msg, men) => {
            return fuwaa.sendMessage(from, {image: {url: path}, caption: caption, mentions: men ? men : []}, {quoted: msg})
        }


        //Detector Group

        // Detector Baileys n Messages
        if ((fromMe || isCmd) && isBaileys) return
        
        //Mode-Bot & Auto-Read
        if (fuwaa.mode === 'self'){
            if (!fromMe && !isOwner) return
            fuwaa.sendPresenceUpdate('unavailable', from)
        } else {
            fuwaa.readMessages([msg.key])
        }

        //Log
        if (isCmd && !isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }

        //Hit
        if (isCmd) {
            axios.get('https://api.countapi.xyz/hit/'+ botName +'/visits').then(({data}) => hit.all = data.value)
            axios.get(`https://api.countapi.xyz/hit/${botName}${moment.tz('Asia/Jakarta').format('DDMMYYYY')}/visits`).then(({data}) => hit.today = data.value)
        }
        //Evaluate and Execute for Owner-sama
        if (isOwner){
            if (chats.startsWith("> ")){
                console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner`))
                try {
                    let evaled = await eval(chats.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    reply(`${evaled}`)
                } catch (err) {
                    reply(`${err}`)
                }
            } else if (chats.startsWith("$ ")){
                console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Owner`))
                exec(chats.slice(2), (err, stdout) => {
					if (err) return reply(`${err}`)
					if (stdout) reply(`${stdout}`)
				})
            }
        }

	    switch (command) {
            //Sistem Command
            case prefix+'rule': case prefix+'rules':
                reply(ind.rules(prefix))
            break
            case prefix+'tos': case prefix+'donate': case prefix+'donasi':
                reply(ind.tos(ownerNumber[0].split('@')[0]))
            break
			case prefix+'owner':
                let array_contact = []
                for ( let x of ownerNumber){
                    let getName = PhoneNumber('+' + x.replace('@s.whatsapp.net', '')).getNumber('international')
                    let array_contacts = { displayName: getName, vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + getName + '\n' + 'ORG:' + 'Owner of ' + botName + '\n' + 'TEL;TYPE=Contact;type=CELL;type=VOICE;waid=' + x.split("@")[0] + ':+' + x.split("@")[0] + '\nX-ABLabel:STMIK Amik Riau' + '\nURL;TYPE=Instagram:https://instagram.com/rashiiddsr\nEMAIL;TYPE=Email:rashiiddsr@gmail.com\nADR;type=Location:;;Pekanbaru, Riau, Indonesia;;;;' + '\n' + 'END:VCARD'.trim()}
                    array_contact.push(array_contacts)
                }
                let genContact = generateWAMessageFromContent(from, { contactsArrayMessage: { contacts : array_contact } }, {quoted: msg})
				fuwaa.relayMessage(from, genContact.message, {})
            break
            case prefix+'fuwaagroup':
                reply(`Link Group FuwaaBot Official:\n https://chat.whatsapp.com/JeyL5h04lEFJVCMNHdzrVL \n\nJangan lupa join ya kak @${sender.split('@')[0]}`, [sender])
            break
            case prefix+'allmenu': case prefix+'menu': case prefix+'help':
                let hit_all = require('util').inspect(hit.all)
                let hit_today =  require('util').inspect(hit.today)  
                let allMenu = `\n\n┌──「 *LIST MENU* 」\n`
                for(let x of listCommands) {
                    allMenu += `│❏ *${prefix}${x}* \n`
                }
                allMenu += `└──「 *FUWABOT* 」`
                sendImg(from, pathImg, ind.listMenu(time, salam, pushname, hit_all, hit_today, runtime(process.uptime()), (fuwaa.mode === 'public' ? 'PUBLIC' : 'SELF')) + allMenu, msg)
            break
            case prefix+'infomenu':
                reply(statUser + ind.infoMenu(prefix))
            break
            case prefix+'ownermenu':
                reply(statUser + ind.ownerMenu(prefix))
            break
            case prefix+'groupmenu':
                reply(statUser + ind.groupMenu(prefix))
            break
            case prefix+'weebsmenu':
                reply(statUser + ind.weebsMenu(prefix))
            break
            case prefix+'miscmenu':
                reply(statUser + ind.miscMenu(prefix))
            break
            case prefix+'mediamenu':
                reply(statUser + ind.mediaMenu(prefix))
            break
            case prefix+'downmenu':
                reply(statUser + ind.downMenu(prefix))
            break
            // Owner
            case prefix+'join': case prefix+'joingc': {
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                if (!q) return reply(ind.wrongFormat(prefix))
                if (!isUrl(q)) return reply(ind.wrongFormat(prefix))
                if (!q.includes('chat.whatsapp.com')) return reply(ind.wrongFormat(prefix))
                let query = q.split('https://chat.whatsapp.com/')[1]
                let data = await fuwaa.groupAcceptInvite(query)
                await reply(jsonformat(data))
                }
            break
            case prefix+'setpp': case prefix+'setppbot':
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                if (isImage || isQuotedImage) {
                    let img = await downloadAndSaveMediaMessage('image','ppgroup.jpeg')
                    await fuwaa.updateProfilePicture(botNumber, { url: img}).then(res => fs.unlinkSync(img))
                    await reply(ind.doneOwner())
                } else {
                    reply(ind.wrongFormat(prefix))
                }
            break
            case prefix+'self':
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                fuwaa.mode = 'self'
                await reply(ind.doneOwner())
            break
            case prefix+'publik': case prefix+'public':
                if (!isOwner && !fromMe) return reply(ind.ownerOnly())
                fuwaa.mode = 'public'
                await reply(ind.doneOwner())
            break
            //Search
		    case prefix+'google':
                await reply(ind.wait())
                if (!q) return reply(ind.wrongFormat(prefix))
                google({ 'query' : q }).then(async (res) =>{
                    let txt = 'Hasil Pencarian Google: ' + q + '\n\n'
                    for (let x of res) {
                        txt += `*${x.title}*\n`
                        txt += `${x.snippet}\n`
                        txt += `*${x.link}*\n\n`
                    }
                    reply('https://www.google.com/search?q=' + q + txt)
                })
            break
            //Group Sistem
            case prefix+'revoke':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                let link = await fuwaa.groupRevokeInvite(from)
                await reply(ind.ok() + `\n\n*New Link for ${groupName}* :\n https://chat.whatsapp.com/${link}`)
            break
            case prefix+'leave':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                reply('Sayonara~ 👋').then(async res => await fuwaa.groupLeave(from))
            break
            case prefix+'linkgroup': case prefix+'linkgrup': case prefix+'linkgc': {
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                let data = await fuwaa.groupInviteCode(from)
                reply('https://chat.whatsapp.com/' + data + `\n\nLink of group *${groupName}*`)
            }
            break
            case prefix+'changename': case prefix+'setnamegc': case prefix+'namegc': 
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                if (q.length >= 25) return reply('Please input max 25 characters')
                let subjectx = await fuwaa.groupUpdateSubject(from, q)
                reply(`Nama group telah dirubah menjadi ${q}`)
            break
            case prefix+'changedesc': case prefix+'setdesc':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                let descx = await fuwaa.groupUpdateDescription(from, q)
                reply(`Deskripsi group telah dirubah menjadi ${q}`)
            break
            case prefix+'changeprofile': case prefix+'setppgroup': case prefix+'setppgrup':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins) return reply(ind.adminOnly())
                if (!isBotGroupAdmins && !isOwner) return reply(ind.botNotAdmin())
                if (isImage || isQuotedImage) {
                    let img = await downloadAndSaveMediaMessage('image', getRandom('jpeg'))
                    await fuwaa.updateProfilePicture(from, { url: img}).then(res => fs.unlinkSync(img))
                    reply(ind.ok())
                } else {
                    reply(ind.wrongFormat(prefix))
                }
            break
            case prefix+'kick':{
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                try {
                    let mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length !== 0){
                        for (let a of mentioned) {
                            if (groupAdmins.includes(a)) return reply(ind.isAdmin())
                            reply(`Good bye~ 👋 \n${mentioned.map(x => `@${x.replace('@s.whatsapp.net', '')}`).join('\n')}`, mentioned).then(() => fuwaa.groupParticipantsUpdate(from, [a], 'remove'))
                        }
                    } else if (isQuotedMsg) {
                        let rply = msg.message.extendedTextMessage.contextInfo.participant
                        if (groupAdmins.includes(rply)) return reply(ind.isAdmin())
                        reply(`Good bye~ @${rply.split('@')[0]}`, [rply]).then(() => fuwaa.groupParticipantsUpdate(from, [rply], 'remove'))
                    }
                } catch {
                    reply(ind.wrongFormat(prefix))
                }
            }
            break
            case prefix+'add':{
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                try {
                    if (!isNaN(args[1])) {
                        let usergc = groupMembers.map(g => g.id.split('@s.whatsapp.net')[0])
                        if(usergc.includes(args[1])) return reply(ind.userAlready())
                        fuwaa.groupParticipantsUpdate(from, [args[1] + '@s.whatsapp.net'], 'add').then(() => reply(ind.ok()))
                    } else if (args.length === 1) {
                        if (!isQuotedMsg) return reply(ind.wrongFormat())
                        let rply = msg.message.extendedTextMessage.contextInfo.participant
                        let usergc = groupMembers.map(g => g.id)
                        if(usergc.includes(rply)) return reply(ind.userAlready())
                        fuwaa.groupParticipantsUpdate(from, [rply], 'add').then(() => reply(ind.ok()))
                    }
                } catch {
                    reply(ind.wrongFormat(prefix))
                }
            }
            break
            case prefix+'promote':{
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                try {
                    let mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length !== 0){
                        reply(`Promote~  \n${mentioned.map(x => `@${x.replace('@s.whatsapp.net', '')}`).join('\n')}`, mentioned)
                        for (let a of mentioned) {
                            if (groupAdmins.includes(a)) return reply(ind.adminAlready())
                            fuwaa.groupParticipantsUpdate(from, [a], 'promote')
                        }
                    } else if (isQuotedMsg) {
                        let rply = msg.message.extendedTextMessage.contextInfo.participant
                        if (groupAdmins.includes(rply)) return reply(ind.adminAlready())
                        reply(`Promote~ @${rply.split('@')[0]}`, [rply])
                        await fuwaa.groupParticipantsUpdate(from, [rply], 'promote')
                    }
                } catch {
                    reply(ind.wrongFormat(prefix))
                }
            }
            break
            case prefix+'demote':{
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (!isBotGroupAdmins) return reply(ind.botNotAdmin())
                try {
                    let mentioned = msg.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length !== 0){
                        reply(`Demote~  \n${mentioned.map(x => `@${x.replace('@s.whatsapp.net', '')}`).join('\n')}`, mentioned)
                        for (let a of mentioned) {
                            if (!groupAdmins.includes(a)) return reply(ind.notAdmin())
                            fuwaa.groupParticipantsUpdate(from, [a], 'demote')
                        }
                    } else if (isQuotedMsg) {
                        let rply = msg.message.extendedTextMessage.contextInfo.participant
                        if (!groupAdmins.includes(rply)) return reply(ind.notAdmin())
                        reply(`Demoted~ @${rply.split('@')[0]}`, [rply])
                        await fuwaa.groupParticipantsUpdate(from, [rply], 'demote')
                    }
                } catch {
                    reply(ind.wrongFormat(prefix))
                }
            }
            break
            case prefix+'group': case prefix+'grup':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                if (args.length === 1) return reply(ind.wrongFormat())
                if (args[1].toLowerCase() === 'open'){
                    await fuwaa.groupSettingUpdate(from, 'not_announcement')
		    reply(ind.ok())
                } else if (args[1].toLowerCase() === 'close'){
                    await fuwaa.groupSettingUpdate(from, 'announcement')
                    reply(ind.ok())
                } else {
                    reply(ind.wrongFormat())
                }
            break
            case prefix+'tagall': case prefix+'infoall':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                let teks = `══✪〘 *👥 Mention All* 〙✪══\n\n➲ *Message : ${q ? q : 'Nothing'}*\n\n`
		      	for (let mem of groupMembers) {
		            teks += `࿃➡️ @${mem.id.split('@')[0]}\n`
				}
                teks += `\n⋙ *${botName}* ⋘`
                fuwaa.sendMessage(from, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: msg })
            break
            case prefix+'hidetag':
                if (!isGroup) return reply(ind.groupOnly())
                if (!isGroupAdmins && !isOwner) return reply(ind.adminOnly())
                fuwaa.sendMessage(from, { text : q ? q : '' , mentions: groupMembers.map(a => a.id)})
            break
            //Weebs
		    case prefix+'waifu':
                await reply(ind.wait())
                fetchJson('https://waifu.pics/api/sfw/waifu').then((data) => {
			    	sendFileFromUrl(from, data.url, ind.ok(), msg)
                }).catch((err) => {
                    for (let x of ownerNumber) {
                        sendMess(x, `${command.split(prefix)[1]} Error: \n\n` + err)
                    }
                    reply(ind.err())
                })
            break
            //Misc
            //Convert and Media
            case prefix+'toimg': case prefix+'stickertoimg': case prefix+'stoimg': case prefix+'stikertoimg': 
				if (isQuotedSticker) {
			    	let media = await downloadAndSaveMediaMessage('sticker', 'sticker.webp')
			    	if (msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated) {
                        await reply(ind.wait())
                        await reply('Maaf, belum support gif')
					} else {
                        await reply(ind.wait())
			    		let ran = getRandom('.png')
					    exec(`ffmpeg -i ${media} ${ran}`, async (err) => {
						    fs.unlinkSync(media)
						    if (err) return reply(ind.err())
						    await fuwaa.sendMessage(from, { image: fs.readFileSync(ran), caption: ind.ok() }, { quoted: msg }).then(res => fs.unlinkSync(ran))
					    })
					}
                } else {
                    reply(ind.wrongFormat(prefix))
                }
	        break
            //Downloader
            default:
            if (isCmd && fuwaa.mode == 'public') {
                reply(ind.cmdNotFound(command, prefix)
            }
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
