
function caseSendOGShello(){
  let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+user.role);
  let content = JSON.parse(response.getContentText());
  let OGS_nick = content.username;
  let mes = BotStrings.get(BotStrings.hello_OGS,OGS_nick);
  mes+="\n\n";
  mes+=BotStrings.get(BotStrings.start_message);
  botSendMessage(chat_id,mes);  
}
function caseSendStartMessage(){
  botSendMessage(chat_id,BotStrings.get(BotStrings.start_message));  
}


function caseCountMyTime(){
  botSendMessage(chat_id,BotStrings.get(BotStrings.my_time));

  let fromDate = text.split(" ");
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
