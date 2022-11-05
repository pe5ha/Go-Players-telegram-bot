
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

  get(key,...args){
    let BotStringsLocale;
    switch(language_code){
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
    "\n"+BotCommands.mytime+" — find out the playing time"+
    "\n"+BotCommands.heatmap+" — get games heatmap"+
    "\n\nSettings:\n"+BotCommands.switch_ogs+" — change OGS account";
  },
  input_ogs_requst(){return "For use bot features send link on your online—go.com account\n";},
  ogs_id_error(){return "OGS account id not defined. Try another link";},
  ogs_linked_success(args){return "The OGS profile is now linked! Your nickname: <b>"+args[0]+"</b>"},
  my_time(args){
    let mes = "";
    if(args.length>2) mes+="from <i>"+args[2]+"</i> to <i>"+args[3]+"</i>:";
    else mes+="data for all time:";
    mes += "\n<b>"+args[0]+"</b> — number of games\n<b>"+args[1]+"</b> — hours of live playing time";
    
    return mes;
  },
  my_time_hint(){return "You can also find out playing time for the specify period. You can send a message in the following format:\n<i>"+
  BotCommands.mytime+" 2022-01-01 2022-02-15</i>"},
  heatmap_title(args){return "<b>heatmap</b> of Go activity on OGS!\nFrom <i>"+args[0]+"</i> to <i>"+args[1]+"</i>:\n"},
  heatmapLegend(){return "Heatmap legend:\n⬜️ = 0 games played per day\n🟨 = 1 games played per day\n🟧 = 2-4 games played per day\n🟥 = 5+ games played per day"+
  "\nDays order: mon tue wed thu fri sat sun"}

};

let BotStringsRu = {

};

// let dataForHeatMap = {
//   data: [], // 
//   levels: [
//     {from: 0, upto: 1},
//     {from: 1, upto: 4},
//     {from: 4, upto: 10},
//     {from: 10, upto: -1}, //-1 типа бесконечность норм?)
//   ]

// }