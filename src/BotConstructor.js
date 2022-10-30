

//dev
let doNotLogDebug = false;
let doNotLogBotSending = true;
let doNotLog = false;

let BotName = "Game_of_Go_bot";

// из свойств скрипта таблицы
token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
table = SpreadsheetApp.openById(SpreadsheetID);


let user = {
  telegramID: null,
  nick: null,
  name: null,
  currentAction: null,
  role: null,
  rowInTable: null,
  isNewUser: null
};

function makeUser(rowInTable, telegramID,nick,name,currentAction=null,role=null,isNewUser=false){
  user.telegramID= telegramID;
  user.nick= nick;
  user.name= name;
  user.currentAction= currentAction;
  user.role= role;
  user.rowInTable= rowInTable;
  user.isNewUser= isNewUser;
  return user;
}

// Bot Commands
let BotCommands = {
  // start: "/start",
  switch_ogs: "/switch_ogs",
  mytime: "/my_played_time",
  heatmap: "/my_heatmap",

  SWITCH_OGS(command,whithParam=false){
    return this.isThisCommand(this.switch_ogs,command,whithParam);
  },
  MYTIME(command,whithParam=false){
    return this.isThisCommand(this.mytime,command,whithParam);
  },
  HEATMAP(command,whithParam=false){
    return this.isThisCommand(this.heatmap,command,whithParam);
  },
  
  isThisCommand(thisCommand,command,whithParam=false){
    if(whithParam){
      if(String(command).startsWith(thisCommand+" ")||String(command).startsWith(thisCommand+"\n")) return true;   
      if(String(command).startsWith(thisCommand+"@"+BotName+" ")||String(command).startsWith(thisCommand+"@"+BotName+"\n")) return true;
    }
    else{
      if(command==thisCommand) return true;
      if(command==thisCommand+"@"+BotName) return true;
    }
    return false;
  }
}


//User roles
let UserRoles = {
  without_role: "",
  admin: "admin",

}


//User Current Actions (use cases)
let UserActions = {
  input_OGS_id: "input OGS id",
  without_action: ""
}

let AdminActions = {

}
let AdminCommands = {
  
}

let ButtonsCallbacks = {

}




// Users sheet structure
let tUsers = {
  sheetName: "Users",
  reg_date_Title: "дата регистрации",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  current_action_Title: "текущее действие",
  role_Title: "OGS",
  allRange: "A:F",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.current_action_Title, 
      this.role_Title
    ];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  },
  use(){
    return table.getSheetByName(this.sheetName);
  }
}

// Logs sheet structure
let LogSheet = {
  SheetName: "Log",
  time_Title: "время",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  message_id_Title: "message id",
  action_Title: "действие",
  what_was_sent_Title: "что прислал",
  bot_answer_Title: "ответ бота",
  getColumnsOrder(){
    return [this.time_Title,	this.id_Title,	this.nick_Title,	this.name_Title,	this.message_id_Title, this.action_Title,this.what_was_sent_Title,this.bot_answer_Title];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  }
}

// Debug sheet structure
let DebugSheet = {
  SheetName: "Debug",
}
