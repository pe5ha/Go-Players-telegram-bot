
function useCases(){


  // first input OGS id
  if(user.currentAction==UserActions.input_OGS_id||user.role==null||user.role==""){ 
    caseInputOGSid();
  } 
  // OGS features
  else if(user.currentAction==UserActions.without_action){
    // сменить аккаунт огс
    if(BotCommands.SWITCH_OGS(text)){
      caseSwithOGS();
    }
    // узнать время между датами
    else if(BotCommands.MYTIME(text,true)){
      caseCountUserTime(true); 
    }
    // узнать всё время
    else if(BotCommands.MYTIME(text)){
      caseCountUserTime(false); 
      botSendMessage(chat_id,BotStrings.get(BotStrings.my_time_hint));
    }
    // нарисовать heatmap
    else if(BotCommands.HEATMAP(text)){
      sendHeatmapAndPlayingTime(user.role);
    }
    // показать /info
    else if(text == "/info"){
      botSendMessage(chat_id,BotStrings.get(BotStrings.heatmapLegend)+"\n\n"+BotStrings.get(BotStrings.my_time_hint));
      botSendMessage(chat_id,BotStrings.get(BotStrings.ogslinks_hint),null,"HTML",true);
    }
    else if(BotCommands.SWITCH_LANG(text,false)){
      botSendMessage(chat_id,BotStrings.get(BotStrings.switch_lang),BotStrings.get(BotStrings.switch_lang_keyboard));
    }
    else if(text.startsWith("https://online-go.com/user/view/")||text.startsWith("https://online-go.com/player/")) {
      let OGS_id;
      let matches = text.match(/\d+/);
      if(matches) {
        OGS_id = parseInt(matches[0]);
        let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id,{muteHttpExceptions: true});
        if(response.getResponseCode()!=200){
          botSendMessage(chat_id,BotStrings.get(BotStrings.ogs_id_error));
          return;
        }
        sendHeatmapAndPlayingTime(OGS_id);
      }
      else{
        botSendMessage(chat_id,BotStrings.get(BotStrings.ogs_id_error));
      }
    }
  
    
  }

  // otherwise
  else {
    // nothing
    // botSendMessage(chat_id, bot_answer_for_unknown);
  }
}

