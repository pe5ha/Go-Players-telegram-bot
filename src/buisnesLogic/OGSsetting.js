
function caseSwithOGS(){
  setUserRole(user,UserRoles.without_role);
  setUserCurrentAction(user,UserActions.input_OGS_id);
  botSendMessage(chat_id,BotStrings.get(BotStrings.INPUT_OGS_REQUST));
}

function caseInputOGSid(){
  if(text.startsWith("https://online-go.com/user/view/")||text.startsWith("https://online-go.com/player/")) {
    caseSettingOGSid();
  }
  else {
    botSendMessage(chat_id,BotStrings.get(BotStrings.INPUT_OGS_REQUST));
  }
}

function caseSettingOGSid(){
  let OGS_id;
  let matches = text.match(/\d+/);
  if(matches) {
    OGS_id = parseInt(matches[0]);
    let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id,{muteHttpExceptions: true});
    if(response.getResponseCode()!=200){
      botSendMessage(chat_id,BotStrings.get(BotStrings.ogs_id_error));
      return;
    }
    let content = JSON.parse(response.getContentText());
    setUserRole(user, OGS_id);
    setUserCurrentAction(user,UserActions.without_action);
    botSendMessage(chat_id,BotStrings.get(BotStrings.ogs_linked_success,content.username));
  }
  else{
    botSendMessage(chat_id,BotStrings.get(BotStrings.ogs_id_error));
  }
}

