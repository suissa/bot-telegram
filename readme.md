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

bot.on( 'message', ( msg ) => console.log( 'msg', msg ) )

/** 
  
  // Retorna isso

msg { message_id: 2,
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
*/

```


Analizando esse retorno podemos perceber


## onText

## Erros

### 409 - onflict: terminated by other long poll or webhook

Esse erro acontece qnd outro BOT com o mesmo TOKEN esta rodando.

```js

body: 
    { ok: false,
      error_code: 409,
      description: 'Conflict: terminated by other long poll or webhook' }

```

