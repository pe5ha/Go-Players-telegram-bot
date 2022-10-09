

function directMessage(){



  // commands
  // start
  if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
    return;
  }
  else if (text == "/start") {
    startCommand();
    return;
  }
  
  // initial user checking
  userRegister(user_id);

  // user current actions (use cases)
  if(user.role==UserRoles.input_OGS_id){ // TODO ogs id
    botSendText(chat_id,"Привет! "+user.role);
    return;
  } 
  else if(user.role==""){
    // custom cases
    if(text.startsWith("https://online-go.com/user/view/")||text.startsWith("https://online-go.com/player/")) {
      setOgsId();
    }
    else {
      botSendText(chat_id,bot_greetings);
    }
  }

  

  // otherwise
  else {
    botSendText(chat_id, bot_answer_for_unknown);
  }
}



function startCommand(payload=null){
  if(userRegister(user_id)){ // проверка и регистрация если это новый юзер в боте
    // TODO новый юзер
    if(payload){ // реферал

    }
  }

}

function setOgsId(){
  let OGS_id;
  let matches = text.match(/\d+/);
  if(matches) {
    OGS_id = parseInt(matches[0]);
    // TODO set user ogs status in table
    setUserRole(user_id, OGS_id);
    botSendText(chat_id,"Твой ID: "+OGS_id);
  }
  else{
    botSendText(chat_id,bot_OGS_id_error);
  }
}