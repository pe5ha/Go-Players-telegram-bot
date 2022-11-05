
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
      caseSendHeatMap(); 
    }
    
  }

  // otherwise
  else {
    // nothing
    // botSendMessage(chat_id, bot_answer_for_unknown);
  }
}

