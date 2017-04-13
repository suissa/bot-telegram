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


- `message`;
- `text`;
- `audio`;
- `document`;
- `photo`;
- `sticker`;
- `video`;
- `voice`;
- `contact`;
- `location`;

Esses serao os eventos que utilizaremos por hora, existem muitos outros como você 
pode conferir na documentaçao, o link esta abaixo.

*fonte: [Node.js Telegram Bot API - Usage - Events](https://github.com/yagop/node-telegram-bot-api/blob/master/doc/usage.md#events)*

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

