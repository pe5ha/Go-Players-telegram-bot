

function directMessage(){

  // start
  if (text.startsWith("/start ")) { 
    let payload = text.split(" ")[1];
    startCommand(payload);
  }
  else if (text == "/start") {
    startCommand();
  }

  // custom cases
  else if(text.startsWith("https://online-go.com/user/view/")||text.startsWith("https://online-go.com/player/")) {
    setOgsId();
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
  if(user_ogs_id==""){ // TODO
    botSendText(chat_id,bot_greetings);
  }
  else {

  }

}

function setOgsId(){
  let OGS_id;
  let matches = t.match(/\d+/);
  if(matches) {
    OGS_id = parseInt(matches[0]);
    // TODO set user ogs status in table
    botSendText(chat_id,"");
  }
  else{
    botSendText(chat_id,bot_OGS_id_error);
  }
}