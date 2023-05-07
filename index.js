const { Telegraf } = require('telegraf');

const bot = new Telegraf('YOUR TELEGRAM BOT KEY');

bot.start(ctx => {
  ctx.reply(`Hello, ${ctx.chat.first_name}! Send me any message to get your user ID. Forward a message from a group or channel, or send a channel/group username (@username), to get its ID.`);
});

bot.help(ctx => {
  ctx.reply(`To get your user ID, send me any message. To get a group or channel ID, forward a message from the group or channel, or send a channel/group username (@username), to me.`);
});

bot.on('message', async ctx => {
  // If message was forwarded from a group or channel
  if (ctx.message.forward_from_chat) {
    const chatId = ctx.message.forward_from_chat.id;
    const chatTitle = ctx.message.forward_from_chat.title;
    ctx.replyWithMarkdown(`The ID of this *${chatTitle}* is \`${chatId}\`.`);
  }
  // If message is a text that contains a group/channel username
  else if (ctx.message.text && ctx.message.text.startsWith('@')) {
    try {
      const chat = await ctx.getChat(ctx.message.text);
      ctx.replyWithMarkdown(`The ID of this *${chat.title}* is \`${chat.id}\`.`);
    } catch (error) {
      ctx.reply(`Sorry, I couldn't find a group or channel with the username ${ctx.message.text}.`);
    }
  }
  // If the message is any other type
  else {
    const userId = ctx.chat.id;
    ctx.replyWithMarkdown(`Your user ID is \`${userId}\`. Forward a message from a group or channel, or send a channel/group username (@username), to get its ID.`);
  }
});

bot.launch();
