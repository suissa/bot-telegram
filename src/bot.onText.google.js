const TelegramBot = require( `node-telegram-bot-api` )
const http = require( `axios` )
const cheerio = require( `cheerio` )

const TOKENS = require( `./token` )

const bot = new TelegramBot( TOKENS.TELEGRAM, { polling: true } )
const URL_BASE = `https://www.google.com.br/search?q=`

const log = ( msg ) => ( result ) => 
  console.log( msg, result )

const getURLFrom = ( elem, $ ) => 
  `Link: ` + $( elem ).attr( `href` )
                      .replace( `/url?q=`, `` )
                      .replace( /\&sa(.*)/, `` )

const sendLinkFromGoogle = ( $, msg ) => ( i, a ) =>
  ( !i ) 
    ? bot.sendMessage( msg.chat.id, getURLFrom( a, $ ) )
          .then( log( `${getURLFrom( a, $ )} delivered!` ) )
          .catch( log( `Error: ` ) )
    : false

const sendLink = ( msg ) => ( response ) => {
  const $ = cheerio.load( response.data )
  
  return $( `.r a` ).each( sendLinkFromGoogle( $, msg ) )
}

const sendGoogle = ( msg, match ) => 
  http.get( `${URL_BASE}${match[ 1 ]}` )
      .then( sendLink( msg ) )
      .catch( log( `Error: `) )


bot.onText( /\/google (.*)/, sendGoogle )
