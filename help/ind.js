exports.wait = () => {
    return `⏳ Mohon tunggu sebentar~`
}

exports.ok = () => {
    return `✅ Done. Ok desu~`
}

exports.err = () => {
    return `‼️Fitur Sedang Error‼️

⏳Sedang melapor bug fitur ke owner-sama⏳`
}

exports.wrongFormat = (prefix) => {
    return `Format salah ‼️ Silakan cek cara penggunaan di *${prefix}allmenu*.`
}

exports.emptyMess = () => {
    return `⚠️ Harap masukkan pesan yang ingin disampaikan! ⚠️`
}

exports.cmdNotFound = (command, prefix) => {
    return `❎ Command *${command}* tidak terdaftar di *${prefix}menu* ❎ `
}

exports.ownerOnly = () => {
    return `⚠️ Command ini khusus Owner-sama! ⚠️`
}

exports.doneOwner = () => {
    return `✔  ️Sudah selesai, Owner-sama~`
}

exports.groupOnly = () => {
    return `👥  Command ini hanya bisa digunakan di dalam grup!`
}

exports.adminOnly = () => {
    return `🙅  Command ini hanya bisa digunakan oleh admin grup!`
}

exports.isAdmin = () => {
    return `⚠️ Tidak  dapat mengeluarkan user yang merupakan admin group! ⚠️`
}

exports.nhFalse = () => {
    return `Kode tidak valid!`
}

exports.listBlock = (blockNumber) => {
    return `*── 「 HALL OF SHAME 」 ──*
    
Total diblokir: *${blockNumber.length}* user\n`
}

exports.notAdmin = () => {
    return `❎ User bukan seorang admin! ❎`
}

exports.userAlready = () => {
return `⚠️ Tidak  dapat menambah user yang merupakan member group! ⚠️`
}

exports.adminAlready = () => {
    return `⚠️ Tidak  dapat mem-promote user yang merupakan admin! ⚠️`
}

exports.botNotAdmin = () => {
    return `Jadikan bot sebagai admin terlebih dahulu! 🙏`
}

exports.received = (pushname) => {
    return `
Halo ${pushname}!
Terima kasih telah melapor, laporanmu akan kami segera terima.`
}

exports.videoLimit = () => {
    return `Ukuran file terlalu besar!`
}

exports.notNum = (q) => {
    return `"${q}", bukan angka!`
}

exports.listMenu = (time, salam, pushname, hit_all, hit_today, runtime, mode) => {
    return `
*Fuwaa-Bot Multi-Devices*

*Selamat ${salam}, ${pushname} 😖*
*⌚Time Server : ${time}*
*🤖 Total Hit All : ${hit_all}*
*📳 Bot Mode : ${mode}*
*🤖 Total Hit Today : ${hit_today}*
*⏳ RunTime :*
*${runtime}*

*⚠️ Dont Spam Bot⚠️*
    `
}

exports.infoMenu = (prefix) => {
    return `
    🤖 *INFO*
├ ${prefix}owner
├ ${prefix}rules
├ ${prefix}donate
├ ${prefix}fuwaagroup
└──────`
}

exports.ownerMenu = (prefix) => {
    return `
    🧑 *OWNER*
├ > evaluate
├ $ exec
├ ${prefix}join link
├ ${prefix}setppbot tag/send_image
├ ${prefix}public
├ ${prefix}self
└──────`
}

exports.groupMenu = (prefix) => {
    return `
    ⚙️ *GROUP*
├ ${prefix}revoke
├ ${prefix}leave
├ ${prefix}setnamegc text
├ ${prefix}setdesc text
├ ${prefix}setppgroup tag/send_image
├ ${prefix}add tag/number
├ ${prefix}kick tag/mentions
├ ${prefix}promote tag/mentions
├ ${prefix}demote tag/mentions
├ ${prefix}group open/close
├ ${prefix}tagall text
├ ${prefix}hidetag text
└──────`
}

exports.weebsMenu = (prefix) => {
    return `
    😷 *WEEBS*
├ ${prefix}waifu
└──────`
}

exports.miscMenu = (prefix) => {
    return `
    🔍 *MISC AND INFO*
├ ${prefix}google text
├ ${prefix}chatai text
└──────`
}

exports.mediaMenu = (prefix) => {
    return `
    🎞 *MEDIA*
├ ${prefix}toimg tag_sticker
└──────`
}

exports.downMenu = (prefix) => {
   return `
    ⬇️ *DOWNLOADER* 
├
└──────`
}


exports.rules = (prefix) => {
    return `
*── 「 RULES AND FAQ 」 ──*

1. Jangan spam bot. 🙅
Sanksi: *⚠️ WARN/SOFT BLOCK*

2. Jangan telepon bot. ☎️
Sanksi: *❎ SOFT BLOCK*

3. Jangan mengeksploitasi bot.😖
Sanksi: *‼️ PERMANENT BLOCK ‼️*

🗯️ Bot tidak atau lambat merespon ?
➡️ Mungkin dipengaruhi oleh jaringan, signal, banned oleh Whatsapp dan beberapa asalan. Tetap patuhi rules‼️

🗯️ Dimana saya bisa mendapatkan Script dari bot ini ?
➡️ Script ini bisa diakses via \`\`\`https://github.com/rashiiddsr/fuwaabot\`\`\`

🗯️ Boleh saya menambah ke grup?
➡️ FuwaaBot dalam status free to add.

🗯️ Prefixnya apa ya?
➡️ Bot ini menggunakan multi prefix. Berarti anda bisa menggunakan prefix #, . , Dan prefix wajar lainnya.

🗯️ Kak, kok saya chat owner tidak direspon?
➡️ Owner hanya merespon pertanyaan seputar bot Dan kendala eror, tidak untuk kenalan ataupun mengemis script.


Jika sudah dipahami rules-nya, silakan ketik *${prefix}allmenu* untuk memulai!

⚠️ Segala kebijakan dan ketentuan FuwaaBot di pegang oleh owner dan segala perubahan kebijakan, sewaktu waktu owner berhak mencabut, memblokir user(*﹏*) 

Arigatou Gozaimasu! Untuk kalian user ramah dan Beberapa orang yg ikut membantu juga dalam project pembuatan FuwaaBot
😖🙏


    `
}

exports.tos = (ownerNumber) => {
    return `
*── 「 DONATE 」 ──*

Hai 👋
Kalian bisa mendukung saya agar bot ini tetap up to date dengan:
🏧${ownerNumber}  (OVO/Dana/GoPay/SPay)

Berapapun donasi kalian akan sangat berarti 👍

Arigatou!

Contact person Owner:
wa.me/${ownerNumber} (Owner)

    `
}
