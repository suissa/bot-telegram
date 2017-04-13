const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `275399831:AAHvjSOiGLxgXmff9wgdECdrZXfMtvnKURw`

const bot = new TelegramBot( TOKEN, { polling: true } )

const logErrorEcho = ( msg ) => ( err ) => 
  console.log( msg, err )

const logSuccessEcho = ( msg, match ) => ( data ) => 
  console.log( `Success: `, data )

const sendEcho = ( msg, match ) => 
  bot.sendMessage( msg.chat.id, match[ 1 ] )
      .then( logSuccessEcho( msg, match ) )
      .catch( logErrorEcho( `Error: ` ) )

bot.onText( /\/echo (.*)/, sendEcho )

