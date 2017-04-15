const TelegramBot = require( `node-telegram-bot-api` )

const TOKENS = require( `./token` )

const bot = new TelegramBot( TOKENS.TELEGRAM, { polling: true } )

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