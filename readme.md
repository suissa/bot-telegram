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
