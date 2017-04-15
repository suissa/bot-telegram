# Criando um BOT para Telegram

Utilizaremos o módulo [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/) para essa tarefa.

Primeira coisa que você precisa é instalar esse módulo:

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

*ps: ñ precisa se preocupar que eu irei revogar o TOKEN quando publicar*

Depois disso precisamos entender o conceito de como esse BOT funcionara', para isso 
vamos ver o coóódigo mais simples possível que interaja com o BOT.

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
cria essa ligaçao entre você e chat que você abriu.

> 
> Guarde bem essa informaçao pois sera muito útil no futuro.
>

Analizando esse retorno podemos montar o seguinte *Schema* para esse resultado:

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
ele nao pegue **TUDO** que vier, mas sim apenas o que desejemos.

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

Esses serao os eventos que utilizaremos por hora, existem muitos outros como você 
pode conferir na documentaçao, o link esta abaixo.

*fonte: [Node.js Telegram Bot API - Usage - Events](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events)*

## onText

Como você viu acima, possuímos o evento `text` e como **sabemos** a funçao `on` sempre 
é utilizada para **ouvir** um evento, por isso o nome da funçao ja é `onText`.

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

O retorno da `msg` ja conhecemos, porém ele possui uma propriedade nova: `entities`.

**Nao entrarei nesse escopo agora, entao vamos continuar com o `echo`.**

O que nos interessa nesse retorno é o seguinte objeto: `match`.

```js

[ '/echo blz mein?',
  'blz mein?',
  index: 0,
  input: '/echo blz mein?' ]

```

Como podemos ver ele é um *array* que contém o resultado do [match](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/match) testando a mensagem que o BOT recebeu com a *RegEx* que você definiu no `onText`.

Caso você nao conheça essa funcao veja como ela funciona executando o seguinte código no Terminal, executando `node` antes.

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
para isso iremos utilizar a fn `bot.sendMessage`.

Sua assinatura é bem simples:

- primeiro: o ID do chat onde foi recebido o texto
- segundo: o texto a ser enviado pelo BOT

```js

bot.sendMessage( id, text )

```

E essa fn ira retornar uma *Promise*, entao sabemos o que fazer né?

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

#### Funcionalidade  - busca no Google

Para criarmos um comando para fazer uma busca usaremos o [axios](https://www.npmjs.com/package/axios), primeira vez que usarei ele, sempre usei request/[request-promise](https://github.com/suissa/request-promise-chains); com ele iremos fazer uma requisiçao `GET` em https://www.google.com.br/#safe=off&q=nomadev


![nomadev no Google](http://i.imgur.com/72mWKTC.png)

##### Plot twist

> Melhor do que *parsear* o HTML de retorno do Google vamos fazer do jeito "certo"?

Bora pegar uma chave para a API do Google para que possamos ter o retorno das buscas no formato JSON, o que nos facilitara r muito nossas vidas.

Entao entre em *[Google API key](https://developers.google.com/custom-search/json-api/v1/overview)* e receba seu TOKEN.

![Google API key image](http://i.imgur.com/YShl5zT.png)

Como você sabe agora possuimos mais um 1 TOKEN, logo precisamos refatorar nosso arquivo `token.js`, depois ensino como fazer usando o `.env`.

![](http://i.imgur.com/2okU1Dj.png)


## Erros

### 409 - onflict: terminated by other long poll or webhook

Esse erro acontece qnd outro BOT com o mesmo TOKEN esta rodando.

```js

body: 
    { ok: false,
      error_code: 409,
      description: 'Conflict: terminated by other long poll or webhook' }

```

