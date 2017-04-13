const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `275399831:AAHvjSOiGLxgXmff9wgdECdrZXfMtvnKURw`

const bot = new TelegramBot( TOKEN, { polling: true } )

bot.on( 'message', ( msg, match ) => {
  console.log( 'msg', msg)
})


// const log = ( msg ) => console.log( msg )

// const logSuccess = ( data ) => console.log( `Success: `, data )
// const logError = ( err ) => console.log( `Error: `, err )

// const sendMessage = ( msg, match ) => 
//   bot.sendMessage( msg.chat.id, match[ 1 ] )
//       .then( logSuccess )
//       .catch( logError )


// bot.on('message') eh a fn que pega qquer
// evento que chegue no bot


// bot.onText soh pegara textos que o bot receber

// const logSuccessEcho = ( msg, match ) => ( data ) => {
//   console.log( `Success msg: `, msg )
//   console.log( `Success match: `, match )
//   console.log( `Success data: `, data )
// }


// const logErrorEcho = ( err ) => console.log( `Error: `, err )

// const sendEcho = ( msg, match ) => 
//   bot.sendMessage( msg.chat.id, match[ 1 ] )
//       .then( logSuccessEcho( msg, match ) )
//       .catch( logErrorEcho )

// bot.onText( /\/echo (.*)/, sendEcho )


// const logSuccess = ( data ) => console.log( `Success: `, data )
// const logError = ( err ) => console.log( `Error: `, err )

// const receiveAsk = ( msg, match ) => 
//   bot.sendMessage( msg.chat.id, match[ 1 ] )
//       .then( logSuccess )
//       .catch( logError )

// bot.onText( /\/ask (.*)/, sendMessage )