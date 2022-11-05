
function caseSendOGShello(){
  let OGS_nick = getOGSNick();
  let mes = BotStrings.get(BotStrings.hello_OGS,OGS_nick);
  mes+="\n\n";
  mes+=BotStrings.get(BotStrings.start_message);
  botSendMessage(chat_id,mes);  
}
function caseSendStartMessage(){
  botSendMessage(chat_id,BotStrings.get(BotStrings.start_message));  
}

function caseCountUserTime(isForPeriod){
  let mes = "";
  mes+= "<code>" + getOGSNick()+"</code> ";
  TelegramAPI.sendChatAction(token,chat_id,"typing");
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
  mes += BotStrings.get(BotStrings.my_time,userTime.totalCount,userTime.totalHours.toFixed(1),stringDateV2(fromDate,true),stringDateV2(toDate,true)); 
 }
 else{
  mes += BotStrings.get(BotStrings.my_time,userTime.totalCount,userTime.totalHours.toFixed(1));
 }
 botSendMessage(chat_id,mes); 
}

function caseSendHeatMap(){
  TelegramAPI.sendChatAction(token,chat_id,"typing");
  let fromDate = new Date(); fromDate.setDate(1); fromDate.setMonth(fromDate.getMonth()-1); // previos month beginning 
  let toDate = new Date(fromDate.getTime()); toDate.setMonth(toDate.getMonth()+1); toDate.setDate(toDate.getDate()-1);
  let gamesCount = getGamesCount(user.role,fromDate,toDate); 
  let dataForHeatMap = {
    data: gamesCount,
    levels: [
      { min: 0, max: 0, value: "⬜️" },
      { min: 1, max: 1, value: "🟨" },
      { min: 2, max: 4, value: "🟧" },
      { min: 5, max: -1, value: "🟥" }
    ],
    startDay: fromDate.getDay()-1,
    fill: "▫️"
  }
  let mes = "<code>"+getOGSNick()+"</code> ";
  mes+= BotStrings.get(BotStrings.heatmap_title,stringDateV2(fromDate,true),stringDateV2(toDate,true));

  let hm = renderHeatMap(dataForHeatMap);
  mes+= hm;

  botSendMessage(chat_id,mes);
  botSendMessage(chat_id,BotStrings.get(BotStrings.heatmapLegend));
}

function getOGSNick(){
  let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+user.role);
  let content = JSON.parse(response.getContentText());
  let OGS_nick = content.username;
  return OGS_nick;
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
/**
 * 
 * @param {number} OGS_id 
 * @param {Date} fromDate 
 * @param {Date} toDate 
 * @returns 
 */
function getGamesCount(OGS_id,fromDate,toDate){
  let daysInMonth = toDate.getDate();
  let gamesCount = new Array(daysInMonth).fill(0);
  let i=1;
  do{
    response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id+"/games?page="+i+"&page_size=100");
    content = JSON.parse(response.getContentText());
    getGamesCountPart(content.results,fromDate,toDate,gamesCount);
    i++;
  }while(content.next!=null);
  return gamesCount;
}

function getGamesCountPart(games,fromDate,toDate,countArray){
  
  for(let i=0;i<games.length;i++){
    if(games[i].annulled) continue;
    let started = games[i].started;
    let ended = games[i].ended;
    if(ended==null) continue;
    let startDate = new Date(started);
    let endedDate = new Date(ended);

    if(toDate) if(toDate<startDate) continue;
    if(fromDate) if(startDate<fromDate) continue;

    // count games per every date
    countArray[startDate.getDate()-1]++;

  }
}
