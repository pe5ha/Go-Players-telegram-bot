
let BotStrings = {
  hello_OGS: "hello_OGS",
  start_message: "start_message",
  INPUT_OGS_REQUST: "input_ogs_requst",
  ogs_id_error: "ogs_id_error",
  ogs_linked_success: "ogs_linked_success",
  my_time: "my_time",
  my_time_hint: "my_time_hint",
  ogslinks_hint: "ogslinks_hint",
  heatmap_title: "heatmap_title",
  heatmapLegend: "heatmapLegend",
  heatmap_keyboard: "heatmap_keyboard",
  refresh_text: "refresh_text",
  save_button: "save_button",
  switch_lang: "switch_lang",
  switch_lang_keyboard: "switch_lang_keyboard",

  get(key,...args){
    let BotStringsLocale;
    switch(user.language_code){
      case "ru":
        BotStringsLocale = BotStringsRu;
        break;
      default:
        BotStringsLocale = BotStringsEng;
    };
  
    if (BotStringsLocale[key] != undefined){
      return BotStringsLocale[key](args);
    }
    else return BotStringsEng[key](args);
  }
}

let BotStringsEng = {
  hello_OGS(args){return "Hello, <b>"+args[0]+"</b>!";},

  start_message(){
    return "Bot features:"+
    "\n"+BotCommands.heatmap+" — build games heatmap"+
    "\n"+BotCommands.info+" — more about the functions"+
    "\n\nSettings:\n"+BotCommands.switch_ogs+" — change OGS account";
    // BotCommands.switch_lang+" — change the language";
  },
  input_ogs_requst(){return "To use the bot's features, send a link to your profile on the site online-go.com\n\n(Link in the format:\nhttps://online-go.com/user/view/512029,\nhttps://online-go.com/player/512029/)";},
  ogs_id_error(){return "The OGS account ID is not defined. Try another link";},
  ogs_linked_success(args){return "The OGS profile is now linked!\nYour nickname: <b>"+args[0]+"</b>\n/start"},
  my_time(args){
    return "<b>"+args[0]+"</b>  — number of games\n<b>"+args[1]+"</b>  — live playing time";
  },
  my_time_hint(){return "<u>Number of games</u>: all completed non-annulled non-private games are counted."+
  "\n<u>Live playing time</u>: the time of all games that lasted less than 3 hours is summed up."},
  heatmap_title(args){return "<code>"+args[0]+"</code> — go player.\n<b>"+monthNames[args[1]]+"-"+args[2]+"</b> <i>(server OGS)</i>:\n\n"},
  heatmapLegend(){return "On the heatmap, the mark of each game refers to the date of creation of the game.\nHeatmap legend:\n⬜️ = 0 games played per day\n🟨 = 1 games played per day\n🟧 = 2-4 games played per day\n🟥 = 5+ games played per day"+
  "\nDays order: sun mon tue wed thu fri sat"},
  heatmap_keyboard(args){
    return {
      inline_keyboard: [
        [{text: "<",callback_data: ButtonsCallbacks.heatmap_update+" "+args[0]},
        {text: args[3],callback_data: ButtonsCallbacks.heatmap_update+" "+args[1]},
        {text: ">",callback_data: ButtonsCallbacks.heatmap_update+" "+args[2]}]
      ]
    }
  },
  refresh_text(){return "Refresh"},
  save_button(){return "💾 Save"},
  ogslinks_hint(){return "You can also send links to the profiles of any players to the bot to view their statistics.\n\n(Links in the format:\nhttps://online-go.com/user/view/512029,\nhttps://online-go.com/player/512029/)"},
  switch_lang(){return "Select a language"},
  switch_lang_keyboard(){return{
    inline_keyboard: [
      [{text: "English",callback_data: ButtonsCallbacks.set_language+" en"},
      {text: "Русский",callback_data: ButtonsCallbacks.set_language+" ru"}]
    ]
  }},

};

let BotStringsRu = {
  hello_OGS(args){return "Привет, <b>"+args[0]+"</b>!";},

  start_message(){
    return "Возможности бота:"+
    "\n"+BotCommands.heatmap+" — график активности"+
    "\n"+BotCommands.info+" — подробнее о функциях"+
    "\n\nНастройки:\n"+BotCommands.switch_ogs+" — сменить OGS аккаунт";
  },
  input_ogs_requst(){return "Чтобы использовать возможности бота, отправь ссылку на свой профиль на сайте online-go.com\n\n(Ссылка такого формата:\nhttps://online-go.com/user/view/512029,\nhttps://online-go.com/player/512029/)";},
  ogs_id_error(){return "ID аккаунта ОГС не получилось определить. Попробуй отправить другую ссылку";},
  ogs_linked_success(args){return "Профиль ОГС теперь привязан!\nТвой никнейм: <b>"+args[0]+"</b>\n/start"},
  my_time(args){
    return "<b>"+args[0]+"</b>  — количество игр\n<b>"+args[1]+"</b>  — общее время";
  },
  my_time_hint(){return "<u>Количество игр</u>: считаются все законченные неаннулированные неприватные игры."+
  "\n<u>Общее время</u>: суммируется время продолжительности всех игр, которые длились менее 3 часов."},
  heatmap_title(args){return "<code>"+args[0]+"</code> — игрок в го.\n<b>"+monthNamesRus[args[1]]+"-"+args[2]+"</b> <i>(сервер OGS)</i>:\n\n"},
  heatmapLegend(){return "На графике отметка каждой игры относится к дате её создания. \nОбозначения:\n⬜️ = 0 игр за день\n🟨 = 1 игр за день\n🟧 = 2-4 игр за день\n🟥 = 5+ игр за день"+
  "\nПорядок дней: пн вт ср чт пт сб вс"},
  heatmap_keyboard(args){
    return {
      inline_keyboard: [
        [{text: "<",callback_data: ButtonsCallbacks.heatmap_update+" "+args[0]},
        {text: args[3],callback_data: ButtonsCallbacks.heatmap_update+" "+args[1]},
        {text: ">",callback_data: ButtonsCallbacks.heatmap_update+" "+args[2]}]
      ]
    }
  },
  refresh_text(){return "Обновить"},
  save_button(){return "💾 Сохранить"},
  ogslinks_hint(){return "Вы можете также присылать в бота ссылки на профили любых игроков, чтобы посмотреть их статистику.\n\n(Ссылки такого формата:\nhttps://online-go.com/user/view/512029,\nhttps://online-go.com/player/512029/)"},

};
