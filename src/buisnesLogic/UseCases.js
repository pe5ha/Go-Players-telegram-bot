

function useCases(){

  // user current actions (use cases)

  // input OGS id
  if(user.currentAction==UserCurrentActions.input_OGS_id||user.role==UserRoles.without_role){ 
    caseInputOGSid();
  } 
  // OGS setted
  else if(user.currentAction==UserCurrentActions.without_action){
    if(text=="/switch_ogs"){
      caseSwithOGS();
      return;
    }
    // if(text=="/time") //TODO
    caseSendOGShello(); 
  }

  // otherwise
  else {
    botSendText(chat_id, bot_answer_for_unknown);
  }
}

function caseSwithOGS(){
  setUserRole(user,UserRoles.without_role);
  setUserCurrentAction(user,UserCurrentActions.input_OGS_id);
  botSendText(chat_id,input_ogs_requst);
}

function caseInputOGSid(){
  if(text.startsWith("https://online-go.com/user/view/")||text.startsWith("https://online-go.com/player/")) {
    caseSettingOGSid();
  }
  else {
    botSendText(chat_id,input_ogs_requst);
  }
}

function caseSettingOGSid(){
  let OGS_id;
  let matches = text.match(/\d+/);
  if(matches) {
    OGS_id = parseInt(matches[0]);
    let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id,{muteHttpExceptions: true});
    if(response.getResponseCode()!=200){
      botSendText(chat_id,bot_OGS_id_error);
      return;
    }
    let content = JSON.parse(response.getContentText());
    setUserRole(user, OGS_id);
    setUserCurrentAction(user,UserCurrentActions.without_action);
    botSendText(chat_id,"The OGS profile is now linked! Your nickname: <b>"+content.username+"</b>");
  }
  else{
    botSendText(chat_id,bot_OGS_id_error);
  }
}

function caseSendOGShello(){
  let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+user.role);
  let content = JSON.parse(response.getContentText());
  let OGS_nick = content.username;
  botSendText(chat_id,"Hello! <b>"+OGS_nick+"</b>");  
}