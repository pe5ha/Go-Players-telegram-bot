
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


function caseCountUserTime(isForPeriod){
  let fromDate = null;
  let toDate = null;
  if(isForPeriod){
    let fromDateMS = Date.parse(text.split(" ")[1]);
    if(fromDateMS) fromDate = new Date(fromDateMS);
    let toDateMS = Date.parse(text.split(" ")[2]);
    if(toDateMS) toDate = new Date(toDateMS);
  }
 let userTime = countUserTime(user.role,fromDate,toDate);
 if(fromDate){
  if(!toDate) toDate = new Date();
  botSendMessage(chat_id,BotStrings.get(BotStrings.my_time,userTime.totalCount,userTime.totalHours.toFixed(1),stringDateV2(fromDate,true),stringDateV2(toDate,true))); 
 }
 else{
  botSendMessage(chat_id,BotStrings.get(BotStrings.my_time,userTime.totalCount,userTime.totalHours.toFixed(1))); 
 }

}

function countUserTime(OGS_id,fromDate=null,toDate=null){
  let totalCount = 0;
  let totalHours = 0;
  let i=1;
  do{
    response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id+"/games?page="+i+"&page_size=100");
    content = JSON.parse(response.getContentText());
    let subTotal = sumGamesTimes(content.results,fromDate,toDate);
    totalCount+=subTotal.count;
    totalHours+=subTotal.hours;
    i++;
  }while(content.next!=null);
  return {totalCount, totalHours};
}

function sumGamesTimes(games,fromDate=null,toDate=null){
  let count = 0;
  let duration_ms = 0;
  for(let i=0;i<games.length;i++){
    if(games[i].annulled) continue;
    let started = games[i].started;
    let ended = games[i].ended;
    if(ended==null) continue;
    let startDate = new Date(started);
    let endedDate = new Date(ended);

    if(toDate) if(toDate<startDate) continue;
    if(fromDate) if(startDate<fromDate) continue;

    // count all games
    count++;

    let gameSpeed = JSON.parse(games[i].time_control_parameters).speed;
    let duration = endedDate-startDate;
    if(duration<(10800000)){ // 10800000 is 3 hours in ms
      duration_ms+=duration;
    }    
  }
  let hours = (duration_ms/3600000); // 3600000 is 1 hours in ms
  return {count, hours};
}
