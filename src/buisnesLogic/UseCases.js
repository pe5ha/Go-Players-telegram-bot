

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
    }
    else if(text.startsWith("/mytime")){
      caseCountMyTime();
    }
    // if(text=="/time") //TODO
    else{
      caseSendOGShello(); 
    }
  }

  // otherwise
  else {
    botSendText(chat_id, bot_answer_for_unknown);
  }
}


function caseCountMyTime(){
  let fromDate = text.split(" ")
}
function countTime(fromDate=null,toDate=null){
  if(fromDate=null){

  }
}

function getMy(){

  // getGames("https://online-go.com/api/v1/players512029/games?&page_size=1000");
  getGames("https://online-go.com/api/v1/players512029/games?page=3&page_size=1000");
}

function getName(){

  let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players00",{muteHttpExceptions: true});
  let content = JSON.parse(response.getContentText());
  Logger.log(response.getResponseCode());
  Logger.log(content);
}

function getGames(request) {
  let response = UrlFetchApp.fetch(request);
  let content = JSON.parse(response.getContentText());
  let count = content.count;
  let countReal = content.results.length;

  let myDate = new Date(2022,8,23);
  Logger.log(myDate);
  let n = 0;
  let minutes = 0;

  for(let i=0;i<countReal;i++){
    let started = content.results[i].started;
    let ended = content.results[i].ended;
    if(ended===null) continue;
    let startDate = new Date(started);
    let endedDate = new Date(ended);
    if(JSON.parse(content.results[i].time_control_parameters).speed!=="correspondence"){
      if(startDate>myDate){
        let min = Math.floor((endedDate-startDate)/60000);
        Logger.log(min);
        n++;
        minutes+=min;
      }
    }
  }
  Logger.log(n);
  Logger.log("Всего: "+ minutes);

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