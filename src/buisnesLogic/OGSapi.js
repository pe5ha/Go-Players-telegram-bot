
function caseSendOGShello(){
  let mes = buildHelloMes();
  botSendMessage(chat_id,mes);  
}
function caseSendStartMessage(){
  botSendMessage(chat_id,BotStrings.get(BotStrings.start_message));  
}

function buildHelloMes(){
  let OGS_nick = getOGSNick(user.role);
  if(!OGS_nick){
    caseSwithOGS();
    return;
  }
  let mes = BotStrings.get(BotStrings.hello_OGS,OGS_nick);
  mes+="\n\n";
  mes+=BotStrings.get(BotStrings.start_message);
  return mes;
}

function caseCountUserTime(isForPeriod){
  let mes = "";
  mes+= "<code>" + getOGSNick()+"</code> ";
  let fromDate = null;
  let toDate = null;
  if(isForPeriod){
    let fromDateMS = Date.parse(text.split(" ")[1]);
    if(fromDateMS) fromDate = new Date(fromDateMS);
    let toDateMS = Date.parse(text.split(" ")[2]);
    if(toDateMS) toDate = new Date(toDateMS);
  }
  if(!fromDate){
    fromDate = new Date();
    fromDate.setDate(1);
    fromDate.setHours(0,0,0,0);
  }
 let userTime = countUserTime(user.role,fromDate,toDate);
 let timeObj = makeTimeObj(); 
 timeObj.add(userTime.totalSeconds);
 
 if(fromDate){
  if(!toDate) toDate = new Date();
  mes += BotStrings.get(BotStrings.my_time,userTime.totalCount,timeObj.toString(true),stringDateV2(fromDate,true),stringDateV2(toDate,true)); 
 }
 else{
  mes += BotStrings.get(BotStrings.my_time,userTime.totalCount,timeObj.toString(true));
 }
 botSendMessage(chat_id,mes); 
}

// подсчёт количества игр и времени игры в промежутке между датами, возврат в виде строки
function buildPlaingTime(ogsID, fromDate, toDate){
  let userActivity = countUserTime(ogsID,fromDate,toDate);
  let timeObj = makeTimeObj(); 
  timeObj.add(userActivity.totalSeconds);
 
  return BotStrings.get(BotStrings.my_time,userActivity.totalCount,timeObj.toString(true)); 
}

function sendHeatmapAndPlayingTime(ogsID, startMonthDate=null, isEditMessage=false){
  // настройка fromDate и toDate
  if(!startMonthDate) {
    startMonthDate = new Date(); 
  }
  startMonthDate.setDate(1); // 1 число месяца
  startMonthDate.setHours(0,0,0,0); // 00:00 часов
  let fromDate = startMonthDate;
  let toDate;
  let isHistory = false;
  if(fromDate.getMonth()==new Date().getMonth() && fromDate.getFullYear() == new Date().getFullYear()){
    toDate = new Date(); // если начало периода текущий месяц, то конец периода - текущая дата.
  }
  else{
    toDate = new Date(fromDate.getFullYear(),fromDate.getMonth()+1,1); // иначе 1 число след. месяца
    isHistory = true; // флаг что прошедший месяц
  }
  let mes = buildHeatmapAndPlayingTime(ogsID, fromDate, toDate);
  if(!mes) return;
  sendHeatmapAndKeyboard(mes, fromDate, ogsID, isHistory, isEditMessage);
}



function buildHeatmapAndPlayingTime(ogsID, fromDate, toDate){
  // заголовок сообщения 
  let OGS_nick = getOGSNick(ogsID);
  if(!OGS_nick) {
    botSendMessage(chat_id, BotStrings.get(BotStrings.ogs_id_error));
    return null;
  }
  let mes = "";
  mes+= BotStrings.get(BotStrings.heatmap_title,OGS_nick,fromDate.getMonth(),fromDate.getFullYear().toString().substr(2,2));

  // подсчёт статистики: количества игр, времени в игре, массива игр по дням
  let userActivity = processPlayerActivity(ogsID,fromDate,toDate);
  
  let startDay = (user.language_code=="ru" ? (fromDate.getDay()+6)%7 : fromDate.getDay()); // первый день Пн, если ru; первый день Вс, если англ
  // хеатмап
  let dataForHeatMap = {
    data: userActivity.gamesCount,
    levels: [
      { min: 0, max: 0, value: "⬜️" },
      { min: 1, max: 1, value: "🟨" },
      { min: 2, max: 4, value: "🟧" },
      { min: 5, max: -1, value: "🟥" }
    ],
    startDay: startDay, 
    fill: "▫️"
  }
  mes+= renderHeatMap(dataForHeatMap);
  mes+= "\n\n";

  // количесво игр, время в игре
  let timeObj = makeTimeObj(); 
  timeObj.add(userActivity.totalSeconds);
  mes+= BotStrings.get(BotStrings.my_time,userActivity.totalCount,timeObj.toString(true)); 

  return mes;
}

function sendHeatmapAndKeyboard(mes, fromDate, ogsID, isHistory=false, isEditMessage=false){
  let prevMonth = stringDateDash(new Date(fromDate.getFullYear(),fromDate.getMonth()-1,1));
  let currMonth = stringDateDash(new Date(new Date().getFullYear(),new Date().getMonth(),1));
  
  let button_text;
  if(contents.update_id%2==0)
    button_text = BotStrings.get(BotStrings.refresh_text)+"🔁";
  else 
    button_text = "🔁"+BotStrings.get(BotStrings.refresh_text);
  let keyboard = {
    inline_keyboard: [
      [{text: "<", callback_data: ButtonsCallbacks.heatmap_update+"="+ogsID+"="+prevMonth},
      {text: button_text, callback_data: ButtonsCallbacks.heatmap_update+"="+ogsID+"="+currMonth},]
    ]
  }
  // кнопки "вправо" не будет, если следующий месяц ещё в будущем
  if(new Date(fromDate.getFullYear(),fromDate.getMonth()+1,1) < new Date()){ 
    let nextMonth = stringDateDash(new Date(fromDate.getFullYear(),fromDate.getMonth()+1,1));
    keyboard.inline_keyboard[0].push({text: ">", callback_data: ButtonsCallbacks.heatmap_update+"="+ogsID+"="+nextMonth});
  }
  if(isHistory){
    keyboard.inline_keyboard.push([{text: BotStrings.get(BotStrings.save_button), callback_data: ButtonsCallbacks.save_heatmap}]);
  }
  
  if(isEditMessage){
    botEditMessage(chat_id,message_id,mes,keyboard);
  }
  else{
    botSendMessage(chat_id,mes,keyboard);
  }
}

/**
 * @deprecated - старая версия только хитмап
 * @param {Date} startMonthDate 
 */
function caseSendHeatMap(startMonthDate,isRefresh=false){
  
  // let fromDate = new Date(); fromDate.setDate(1); //fromDate.setMonth(fromDate.getMonth()-1); // previos month beginning 
  // let toDate = new Date(fromDate.getTime()); toDate.setMonth(toDate.getMonth()+1); toDate.setDate(toDate.getDate()-1);
  let fromDate = startMonthDate;
  let toDate;
  if(startMonthDate.getMonth()==new Date().getMonth()){
    toDate = new Date();
  }
  else{
    toDate = new Date(fromDate.getFullYear(),fromDate.getMonth()+1,1);
  }
  let daysInMonth = new Date(fromDate.getFullYear(), fromDate.getMonth()+1, 0).getDate();
  let gamesCount = getGamesCount(user.role,fromDate,toDate,daysInMonth); 
  let dataForHeatMap = {
    data: gamesCount,
    levels: [
      { min: 0, max: 0, value: "⬜️" },
      { min: 1, max: 1, value: "🟨" },
      { min: 2, max: 4, value: "🟧" },
      { min: 5, max: -1, value: "🟥" }
    ],
    startDay: (fromDate.getDay()+6)%7, // чтобы 0 было не Вс, а Пн
    fill: "▫️"
  }
  let mes = "";
  mes+= BotStrings.get(BotStrings.heatmap_title,getOGSNick(),fromDate.getMonth(),fromDate.getFullYear());

  let hm = renderHeatMap(dataForHeatMap);
  mes+= hm;
  let prevMonth = stringDateDash(new Date(fromDate.getFullYear(),fromDate.getMonth()-1,1));
  let currMonth = stringDateDash(new Date(new Date().getFullYear(),new Date().getMonth(),1));
  let nextMonth = stringDateDash(new Date(fromDate.getFullYear(),fromDate.getMonth()+1,1));
  
  let button_text;
  if(contents.update_id%2==0){
    button_text = BotStrings.get(BotStrings.refresh_text)+"🔁";
  }
  else button_text = "🔁"+BotStrings.get(BotStrings.refresh_text);
  let keyboard = BotStrings.get(BotStrings.heatmap_keyboard,prevMonth,currMonth,nextMonth,button_text);
  if(!isRefresh){
    botSendMessage(chat_id,mes,keyboard);
    botSendMessage(chat_id,BotStrings.get(BotStrings.heatmapLegend));
  }
  else{
    botEditMessage(chat_id,message_id,mes,keyboard);
  }
}

function getOGSNick(ogsID){
  let response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+ogsID);
  if(response.getResponseCode()!=200){
    return null;
  }
  let content = JSON.parse(response.getContentText());
  let OGS_nick = content.username;
  return OGS_nick;
}


let endSearchFlag = false;

function processPlayerActivity(OGS_id,fromDate=null,toDate=null){
  endSearchFlag = false;
  let daysInMonth = new Date(fromDate.getFullYear(), fromDate.getMonth()+1, 0).getDate();
  let gamesCount = new Array(daysInMonth).fill(0);
  let totalCount = 0;
  let totalSeconds = 0;
  let i=1;
  do{
    
    TelegramAPI.sendChatAction(token,chat_id,"typing");

    response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id+"/games?ordering=-id&ended__isnull=false&page="+i+"&page_size=100");
    content = JSON.parse(response.getContentText());
    let subTotal = processPartOfPlayerActivity(content.results,gamesCount,fromDate,toDate,);
    totalCount+=subTotal.count;
    totalSeconds+=subTotal.seconds;
    i++;
  }while(content.next!=null&&(!endSearchFlag));
  return {totalCount, totalSeconds, gamesCount};
}


function processPartOfPlayerActivity(games,countArray,fromDate=null,toDate=null){
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
    if(fromDate) if(startDate<fromDate) {
      endSearchFlag = true;
      break;
    }
    // count games per every date
    countArray[startDate.getDate()-1]++;
    // count all games
    count++;

    let duration = endedDate-startDate;
    if(duration<(10800000)){ // 10800000 is 3 hours in ms
      duration_ms+=duration;
    }    
  }
  let seconds = (duration_ms/1000); // 1000 is 1 seconds in ms
  return {count, seconds};
}




function countUserTime(OGS_id,fromDate=null,toDate=null){
  endSearchFlag = false;
  let totalCount = 0;
  let totalSeconds = 0;
  let i=1;
  do{
    
    TelegramAPI.sendChatAction(token,chat_id,"typing");

    response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id+"/games?ordering=-id&ended__isnull=false&page="+i+"&page_size=100");
    content = JSON.parse(response.getContentText());
    let subTotal = sumGamesTimes(content.results,fromDate,toDate);
    totalCount+=subTotal.count;
    totalSeconds+=subTotal.seconds;
    i++;
  }while(content.next!=null&&(!endSearchFlag));
  return {totalCount, totalSeconds};
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
    if(fromDate) if(startDate<fromDate) {
      endSearchFlag = true;
      break;
    }

    // count all games
    count++;

    let duration = endedDate-startDate;
    if(duration<(10800000)){ // 10800000 is 3 hours in ms
      duration_ms+=duration;
    }    
  }
  let seconds = (duration_ms/1000); // 1000 is 1 seconds in ms
  return {count, seconds};
}
/**
 * 
 * @param {number} OGS_id 
 * @param {Date} fromDate 
 * @param {Date} toDate 
 * @returns 
 */
function getGamesCount(OGS_id,fromDate,toDate,daysInMonth){
  endSearchFlag = false;
  let gamesCount = new Array(daysInMonth).fill(0);
  let i=1;
  do{

    TelegramAPI.sendChatAction(token,chat_id,"typing");

    response = UrlFetchApp.fetch("https://online-go.com/api/v1/players"+OGS_id+"/games?ordering=-id&ended__isnull=false&page="+i+"&page_size=100");
    content = JSON.parse(response.getContentText());
    getGamesCountPart(content.results,fromDate,toDate,gamesCount);
    i++;
  }while(content.next!=null&&(!endSearchFlag));
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
    if(fromDate) if(startDate<fromDate) {
      endSearchFlag = true;
      break;
    }

    // count games per every date
    countArray[startDate.getDate()-1]++;

  }
}
