
let BotStrings = {
  hello_OGS: "hello_OGS",
  start_message: "start_message",
  INPUT_OGS_REQUST: "input_ogs_requst",
  ogs_id_error: "ogs_id_error",
  ogs_linked_success: "ogs_linked_success",
  my_time: "my_time",
  

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
    "\n"+BotCommands.mytime+" - find out the time played"+
    "\n"+BotCommands.heatmap+" - get games heatmap"+
    "\n\nSettings:\n"+BotCommands.switch_ogs+" - change OGS account";
  },
  input_ogs_requst(){return "For use bot features send link on your online-go.com account\n";},
  ogs_id_error(){return "OGS account id not defined. Try another link";},
  ogs_linked_success(args){return "The OGS profile is now linked! Your nickname: <b>"+args[0]+"</b>"},
  my_time(args){
    let mes = "Your total number of games is: <b>"+args[0]+"</b>\nAnd your total live playing time is: <b>"+args[1]+"</b> hours";
    if(args.length>2) mes+="\nThis is the data for the period from "+args[2]+" to "+args[3];
    else mes+="\nThis is the data for all time";
    return mes;
  },

};

let BotStringsRu = {

};
