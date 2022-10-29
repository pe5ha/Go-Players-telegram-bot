// версия 1

function directMessage(){

  // initial user checking
  userRegister(user_id);

  // start
  if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
  }
  else if (text == "/start") {
    startCommand();
  }
  
  // Buisnes Logic
  else {
    useCases();
  }

  
}



function startCommand(payload=null){
  if(user.isNewUser){ // если новый юзер
    // TODO новый юзер
    if(payload){ // реферал
     
    }
  }
  else{
    if(payload){ // deep link

      // return ?
    }
  }
  botSendText(user_id,bot_start_message);

}
