const TelegramBot = require( `node-telegram-bot-api` )
const http = require( `axios` )

const TOKEN = require( `./token` )

const bot = new TelegramBot( TOKEN, { polling: true } )
const URL_BASE = `https://www.google.com.br/#safe=off`
const q = `nomadev`

http.get( URL_BASE, {
    params: { q }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const logErrorEcho = ( msg ) => ( err ) => 
  console.log( msg, err )

const logSuccessEcho = ( msg, match ) => ( data ) => 
  console.log( `Success: `, data )

const sendEcho = ( msg, match ) => 
  bot.sendMessage( msg.chat.id, match[ 1 ] )
      .then( logSuccessEcho( msg, match ) )
      .catch( logErrorEcho( `Error: ` ) )

bot.onText( /\/echo (.*)/, sendEcho )

// bot.onText( /\/echo (.*)/, ( msg, match ) => {
//   console.log( `echo msg: `, msg ) 
//   console.log( `echo match: `, match ) 
// })