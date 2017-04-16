# Criando um BOT para Telegram

Utilizaremos o módulo [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/) para essa tarefa.

Primeira coisa que precisamos fazer é instalar esse módulo:

```

npm i -S node-telegram-bot-api

```

E depois iniciar um arquivo `index.js` com as seguintes linhas:

```js

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `SEU TOKEN`

const bot = new TelegramBot( TOKEN, { polling: true } )

```

> 
> Mas onde pego esse `TOKEN` ?
> 

Click nesse manolo -> [@BotFather](https://telegram.me/botfather) <- para incicar o chat com o Bot gerenciador de Bots. <3

![@BotFather](http://i.imgur.com/vYqkBH2.png)

Bom como você deve ter percebido ele é auto-explicativo, entao vamos criar nosso bot.

Após executar o comando `/newbot` siga suas instruções:

![Escolhendo o nome do bot](http://i.imgur.com/tcTfVqo.png)

Depois coloque o TOKEN no nosso código:

```js

const TelegramBot = require( `node-telegram-bot-api` )

const TOKEN = `275399831:AAHvjSOiGLxgXmff9wgdECdrZXfMtvnKURw
`

const bot = new TelegramBot( TOKEN, { polling: true } )

```

*ps: ñ precisa se preocupar pois jah revoguei o TOKEN antes de publicar*

Depois disso precisamos entender o conceito de como esse BOT funcionara', para isso 
vamos ver o código mais simples possível que interaja com o BOT.

```js

bot.on( 'message', ( msg ) => console.log( 'msg', msg ) )

```

![](http://i.imgur.com/R8gKP06.png)

Enviando essa mensagem para o BOT iremos ter o seguinte retorno no console:

```js

{ message_id: 2,
  from: 
   { id: 77586615,
     first_name: 'Suissa Refatoreitor',
     last_name: 'Tabajara',
     username: 'osuissa' },
  chat: 
   { id: 77586615,
     first_name: 'Suissa Refatoreitor',
     last_name: 'Tabajara',
     username: 'osuissa',
     type: 'private' },
  date: 1492093704,
  text: 'oi' }
}

```

Logo percebemos que além dos dados basicos:

- message_id: identificador dessa mensagem
- date: data no formato [timestamp]()
- text: texto recebido pelo BOT

Também possuimos 2 outros objetos:

- from: dados de quem enviou a mensagem
- chat: dados do chat aberto entre você e o BOT

Facilmente podemos inferir que o `chat.id` é igual ao `from.id`, logo o Telegram 
cria essa ligação entre você e chat que você abriu.

> 
> Guarde bem essa informação pois sera muito útil no futuro.
>

Analisando esse retorno podemos montar o seguinte *Schema* para esse resultado:

```js
const from = { 
  id: Number,
  first_name: String,
  last_name: String,
  username: String 
}
     
const chat = { 
  id: Number,
  first_name: String,
  last_name: String,
  username: String,
  type: String 
}

const Schema = { 
  message_id: Number,
  from,
  chat,
  date: Number,
  text: String
}

```

*Logo mais voltaremos nesse assunto dos Schemas.*

Para dar continuidade ao nosso BOT iremos utilizar eventos específicos para que 
ele não pegue **TUDO** que vier, mas sim apenas o que desejemos.

Vejamos quais sao esses eventos:

- `message`
- `text`
- `audio`
- `document`
- `photo`
- `sticker`
- `video`
- `voice`
- `contact`
- `location`

Esses serão os eventos que utilizaremos por hora, existem muitos outros como você 
pode conferir na documentação, o link esta abaixo.

*fonte: [Node.js Telegram Bot API - Usage - Events](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events)*

## onText

Como você viu acima, possuímos o evento `text` e como **sabemos** a função `on` sempre 
é utilizada para **ouvir** um evento, por isso o nome da função ja é `onText`.

O melhor dela é que possamos passar, como primeiro parametro, uma *RegEx* para que 
o BOT execute o *callback* apenas se o texto enviado pelo usuario *"caiba"* nessa *RegEx*.

Utilizaremos o exemplo mais simples que encontramos por aí:

```js

bot.onText( /\/echo (.*)/, ( msg, match ) => {
  console.log( `echo msg: `, msg ) 
  console.log( `echo match: `, match ) 
})

/**
echo msg:  { message_id: 7,
  from: 
   { id: 77586615,
     first_name: 'Suissa Refatoreitor',
     last_name: 'Tabajara',
     username: 'osuissa' },
  chat: 
   { id: 77586615,
     first_name: 'Suissa Refatoreitor',
     last_name: 'Tabajara',
     username: 'osuissa',
     type: 'private' },
  date: 1492101864,
  text: '/echo blz mein?',
  entities: [ { type: 'bot_command', offset: 0, length: 5 } ] }

echo match:  [ '/echo blz mein?',
  'blz mein?',
  index: 0,
  input: '/echo blz mein?' ]


*/

```

O retorno da `msg` jah conhecemos, porém ele possui uma propriedade nova: `entities`.

**Não entrarei nesse escopo agora, entao vamos continuar com o `echo`.**

O que nos interessa nesse retorno é o seguinte objeto: `match`.

```js

[ '/echo blz mein?',
  'blz mein?',
  index: 0,
  input: '/echo blz mein?' ]

```

Como podemos ver ele é um *array* que contém o resultado do [match](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match) testando a mensagem que o BOT recebeu com a *RegEx* que você definiu no `onText`.

Caso você não conheça essa funcao veja como ela funciona executando o seguinte código no Terminal, executando `node` antes.

```js

> '/echo blz mein?'.match(/\/echo (.*)/)
[ '/echo blz mein?',
  'blz mein?',
  index: 0,
  input: '/echo blz mein?' ]

```

Logo conseguimos entender que:

- na posiçao 0: temos o valor total do texto
- na posiçao 1: o texto sem a *RegEx*
- na posiçao 2: o índice onde foi encontrada a *RegEx*
- na posiçao 3: a entrada

Agora vamos fazer o BOT enviar como mensagem o mesmo texto recebido no chat, 
para isso iremos utilizar a função `bot.sendMessage`.

Sua assinatura é bem simples:

- primeiro: o ID do chat onde foi recebido o texto
- segundo: o texto a ser enviado pelo BOT

```js

bot.sendMessage( id, text )

```

E essa função irah retornar uma *Promise*, entao sabemos o que fazer né?

```js

const logErrorEcho = ( msg ) => ( err ) => 
  console.log( msg, err )

const logSuccessEcho = ( msg, match ) => ( data ) => 
  console.log( `Success: `, data )

const sendEcho = ( msg, match ) => 
  bot.sendMessage( msg.chat.id, match[ 1 ] )
      .then( logSuccessEcho( msg, match ) )
      .catch( logErrorEcho( `Error: ` ) )

bot.onText( /\/echo (.*)/, sendEcho )

```

![Exemplo do echo](http://i.imgur.com/4RVZjir.png)

### Funcionalidades

#### Funcionalidade  - Busca no Google

![google it](https://s-media-cache-ak0.pinimg.com/236x/a8/4b/bf/a84bbf4e8b0d1fbdf31182b2b340680e.jpg)

Para criarmos um comando para fazer uma busca usaremos o [axios](https://www.npmjs.com/package/axios), primeira vez que usarei ele, sempre usei request/[request-promise](https://github.com/suissa/request-promise-chains); com ele iremos fazer uma requisição `GET` em https://www.google.com.br/search?q=nomadev e parsear seu HTML, com [cheerio](https://www.npmjs.com/package/cheerio) para retirarmos as informaçoes necessarias.

> **Sim isso é um *crawler*!**


![nomadev no Google](http://i.imgur.com/kyHRxu3.png)

Porém quando requisitamos `nomadev` ao Google e pegamos o atributo `href`:

![print screen](http://i.imgur.com/ksgH8Pj.png)

```js

  http.get( URL_BASE + match[ 1 ] )
      .then( (response) => {

        const $ = cheerio.load( response.data )
        $( `.r a` ).each( ( i, elem ) => {
          if ( i === 1 ) return false

          const url = $( elem ).attr( `href` )
          console.log(`url`, url)

      })
      .catch(function (error) {
        console.log(error);
      });

```

<br>

Recebemos o seguinte valor: `/url?q=http://nomadev.com.br/&sa=U&ved=0ahUKEwiC96G_xKbTAhVFhZAKHQKoALwQFggVMAA&usg=AFQjCNFAoCxThw2mWS4Xvg-PlvnwG0EWdQ`

<br>

Depois de analisar outras buscas percebi que a *url* desejada **sempre** vem adicionada de `/url?q=` e `&sa=U&ved=0ahUKEwiC96G_xKbTAhVFhZAKHQKoALwQFggVMAA&usg=AFQjCNFAoCxThw2mWS4Xvg-PlvnwG0EWdQ` logo preciso executar um `replace` em cada parte para retirar o indesejado:


```js

  http.get( URL_BASE + match[ 1 ] )
      .then( (response) => {

        const $ = cheerio.load( response.data )
        $( `.r a` ).each( ( i, elem ) => {
          if ( i === 1 ) return false

          const url = $( elem ).attr( `href` )
                                .replace( `/url?q=`, `` )
                                .replace( /\&sa(.*)/, `` )
          console.log(`url`, url)

      })
      .catch(function (error) {
        console.log(error);
      });

```

<br>

Prontinho! A possuimos a *url* desejada e podemos enviar ela como mensagem pelo BOT.

```js

const TelegramBot = require( `node-telegram-bot-api` )
const http = require( `axios` )
const cheerio = require( `cheerio` )

const TOKENS = require( `./token` )

const bot = new TelegramBot( TOKENS.TELEGRAM, { polling: true } )
const URL_BASE = `https://www.google.com.br/search?q=`

const log = ( msg ) => ( result ) => 
  console.log( msg, result )

const sendGoogle = ( msg, match ) => {

  http.get( `${URL_BASE}${match[ 1 ]}` )
      .then( (response) => {

        const $ = cheerio.load( response.data )
        $( `.r a` ).each( ( i, elem ) => {
          if ( i === 1 ) return false

          const url = $( elem ).attr( `href` )
                                .replace( `/url?q=`, `` )
                                .replace( /\&sa(.*)/, `` )
                                
        bot.sendMessage( msg.chat.id, url, { parse_mode: 'Markdown' } )
            .then( log( `${url} delivered!` ) )
            .catch( log( `Error: ` ) )
        });
      })
      .catch(function (error) {
        console.log(error);
      });
}

bot.onText( /\/google (.*)/, sendGoogle )

```

<br>

**Resultado:**

```

http://nomadev.com.br/ delivered! { message_id: 52,
  from: 
   { id: 275399831,
     first_name: 'meu_exemplo_de_bot',
     username: 'meu_exemplo_de_bot' },
  chat: 
   { id: 77586615,
     first_name: 'Suissa Refatoreitor',
     last_name: 'Tabajara',
     username: 'osuissa',
     type: 'private' },
  date: 1492262538,
  text: 'http://nomadev.com.br/',
  entities: [ { type: 'url', offset: 0, length: 22 } ] }

```

<br>
<br>


#### Refatorando Funcionalidade  - Busca no Google

<br>

> **Vamos refatorar para funções puras!**

<br>

```js

const TelegramBot = require( `node-telegram-bot-api` )
const http = require( `axios` )
const cheerio = require( `cheerio` )

const TOKENS = require( `./token` )

const bot = new TelegramBot( TOKENS.TELEGRAM, { polling: true } )
const URL_BASE = `https://www.google.com.br/search?q=`

const log = ( msg ) => ( result ) => 
  console.log( msg, result )

const getURLFrom = ( elem, $ ) => 
  $( elem ).attr( `href` )
            .replace( `/url?q=`, `` )
            .replace( /\&sa(.*)/, `` )

const sendLinkFromGoogle = ( $, msg ) => ( i, a ) =>
  ( !i ) 
    ? bot.sendMessage( msg.chat.id, getURLFrom( a, $ ), { parse_mode: 'Markdown' } )
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

```

<br>

**Bora testar o comando: `/google github suissa`**

<br>

![github do suissa](http://i.imgur.com/LKrmTDm.png)


### DESAFIO - Busca

Caso você queira treinar e contribuir com esse projeto crie um bot para alguma das seguintes buscas:

- Wikipedia
- mdn.io
- DuckDuckGo
- redtube
- npm
- caniuse
- http.cat

E envie para a pasta `src/` o arquivo com o nome: `desafioBusca.${seu_github_user}.js`

<br>
<br>

> **Depois irei ensinar a mordularizar e utilizaremos todas as buscas no mesmo BOT!**

<br>
<br>
<br>


**TERMINA AQUI POR HORA!!!!**


// Logo + falar sobre os parse_mode MD e HTML { parse_mode: 'Markdown' }

## Erros

### 409 - onflict: terminated by other long poll or webhook

Esse erro acontece qnd outro BOT com o mesmo TOKEN esta rodando.

```js

body: 
    { ok: false,
      error_code: 409,
      description: 'Conflict: terminated by other long poll or webhook' }

```

