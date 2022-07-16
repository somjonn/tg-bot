require('dotenv').config();
const Telegraf = require('telegraf');
const api = require('countryjs');
const Markup = require('telegraf/markup');
const COUNTRIES_LIST = require('./constants');


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Hej ${ctx.message.from.first_name}`));

bot.hears('hi', (ctx) => ctx.reply('hello', Markup.keyboard([
   ['US','France'],
   ['Denmark','Germany'],
   ['Italy','Netherlands'],
])
   .resize()
   .extra()
));

bot.help((ctx) => ctx.reply(COUNTRIES_LIST));
bot.on('text', async (ctx) => {
   let data = {};
   try{
  data = await api.getReportsByCountries(ctx.message.text);

  const formatData = `
   Country: ${data[0][0].country}
   Borders: ${data[0][0].borders}
   Codes: ${data[0][0].callingCodes}
   Languages: ${data[0][0].languages}
   `
   ctx.reply(formatData);
   } catch {
      ctx.reply('wrong country name');
   }
}); 

bot.launch();
