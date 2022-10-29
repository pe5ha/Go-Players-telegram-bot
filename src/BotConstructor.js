

//dev
let doNotLogDebug = false;
let doNotLogBotSending = true;
let doNotLog = false;

let BotName = "Game_of_Go_bot";

// из свойств скрипта таблицы
token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
table = SpreadsheetApp.openById(SpreadsheetID);

// Bot Commands
let BotCommands = {
  // start: "/start",

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
  ogs_Title: "OGS",
  allRange: "A:F",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.current_action_Title, 
      this.ogs_Title
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
