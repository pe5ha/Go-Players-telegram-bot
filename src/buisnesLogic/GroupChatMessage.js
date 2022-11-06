
function groupChatMessage(message){

  // groups chat disabled
  return;


  // only start
  if (text == "/start" || text == "/start@"+BotName) {
    startCommand();
  }
  // in group: t.me/your_bot?startgroup=payload
  
  // Buisnes Logic

  // если это реплай на сообщение бота
  else if(message.reply_to_message){
    
  }

  else {
    useCases();
  }
 


}

