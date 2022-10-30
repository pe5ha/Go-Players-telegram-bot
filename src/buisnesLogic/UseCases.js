
function useCases(){


  // input OGS id
  if(user.currentAction==UserActions.input_OGS_id||user.role==null||user.role==""){ 
    caseInputOGSid();
  } 
  // OGS setted
  else if(user.currentAction==UserActions.without_action){
    if(BotCommands.SWITCH_OGS(text)){
      caseSwithOGS();
    }
    else if(BotCommands.MYTIME(text,true)){
      // whith param
      caseCountMyTime(); 
    }
    else if(BotCommands.MYTIME(text)){
      // total
      caseCountMyTime(); 
    }
    // if(text=="/time") //TODO
    // else{
    //   caseSendOGShello(); 
    // }
  }

  // otherwise
  else {
    // nothing
    // botSendMessage(chat_id, bot_answer_for_unknown);
  }
}

