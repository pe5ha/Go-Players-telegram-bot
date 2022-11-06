
let BotStrings = {
  hello_OGS: "hello_OGS",
  start_message: "start_message",
  INPUT_OGS_REQUST: "input_ogs_requst",
  ogs_id_error: "ogs_id_error",
  ogs_linked_success: "ogs_linked_success",
  my_time: "my_time",
  my_time_hint: "my_time_hint",
  heatmap_title: "heatmap_title",
  heatmapLegend: "heatmapLegend",
  heatmap_keyboard: "heatmap_keyboard",
  refresh_text: "refresh_text",
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
    "\n"+BotCommands.mytime+" — count the playing time"+
    "\n"+BotCommands.heatmap+" — build games heatmap"+
    "\n\nSettings:\n"+BotCommands.switch_ogs+" — change OGS account";
    // BotCommands.switch_lang+" — change the language";
  },
  input_ogs_requst(){return "To use the bot features, send a link to your online-go.com account\n";},
  ogs_id_error(){return "The OGS account ID is not defined. Try another link";},
  ogs_linked_success(args){return "The OGS profile is now linked! Your nickname: <b>"+args[0]+"</b>"},
  my_time(args){
    let mes = "";
    if(args.length>2) mes+="from <i>"+args[2]+"</i> to <i>"+args[3]+"</i>:";
    else mes+="all-time data:";
    mes += "\n<b>"+args[0]+"</b> — number of games\n<b>"+args[1]+"</b> — hours of live playing time";
    
    return mes;
  },
  my_time_hint(){return "Number of games: all completed non-annulled non-private games are counted."+
  "\nLive playing time: the time of all games that lasted less than 3 hours is summed up."+
  "\nYou can also find out the playing time for the specific period. You can send a message in the following format:\n<i>"+
  BotCommands.mytime+" 2022-01-01 2022-02-15</i>"},
  heatmap_title(args){return "<b>heatmap</b>! \nGo activity in <i>"+args[0]+"</i>:\n"},
  heatmapLegend(){return "Heatmap legend:\n⬜️ = 0 games played per day\n🟨 = 1 games played per day\n🟧 = 2-4 games played per day\n🟥 = 5+ games played per day"+
  "\nDays order: mon tue wed thu fri sat sun"},
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
    "\n"+BotCommands.mytime+" — узнать наигранное время"+
    "\n"+BotCommands.heatmap+" — график активности"+
    "\n\nНастройки:\n"+BotCommands.switch_ogs+" — сменить OGS аккаунт";
  },
  input_ogs_requst(){return "Чтобы использовать возможности бота отправь ссылку на свой профиль на online-go.com\n";},
  ogs_id_error(){return "ID аккаунта ОГС не получилось определить. Попробуй отправить другую ссылку";},
  ogs_linked_success(args){return "Профиль ОГС теперь привязан! Твой никнейм: <b>"+args[0]+"</b>"},
  my_time(args){
    let mes = "";
    if(args.length>2) mes+="с <i>"+args[2]+"</i> по <i>"+args[3]+"</i>:";
    else mes+="за всё время:";
    mes += "\n<b>"+args[0]+"</b> — количество игр\n<b>"+args[1]+"</b> — часы наигранного времени";
    
    return mes;
  },
  my_time_hint(){return "Количество игр: считаются все законченные неаннулированные неприватные игры."+
  "\nНаигранное время: суммируется время всех игр, которые длились меньше 3 часов."+
  "\nТакже можно узнать наигранное время за определенный период. Нужно отправить сообщение в таком формате:\n<i>"+
  BotCommands.mytime+" 2022-01-01 2022-02-15</i>"},
  heatmap_title(args){return "<b>heatmap</b>! \nГо активность в <i>"+args[0]+"</i>:\n"},
  heatmapLegend(){return "Обозначения:\n⬜️ = 0 игр за день\n🟨 = 1 игр за день\n🟧 = 2-4 игр за день\n🟥 = 5+ игр за день"+
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
  refresh_text(){return "Обновить"}


};
