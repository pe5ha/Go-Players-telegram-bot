

//dev
let doNotLogDebug = false;
let doNotLogBotSending = false;
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
  isNewUser: null,
  language_code: null,
};

function makeUser(rowInTable, telegramID,nick,name,language_code,currentAction=null,role=null,isNewUser=false){
  user.telegramID= telegramID;
  user.nick= nick;
  user.name= name;
  user.currentAction= currentAction;
  user.role= role;
  user.rowInTable= rowInTable;
  user.isNewUser= isNewUser;
  user.language_code=language_code;
  return user;
}


let ButtonsCallbacks = {
  heatmap_update: "heatmap_update",
  set_language: "set_language",
  save_heatmap: "save_heatmap",

  HEATMAP_UPDATE(button,whithParam=false){
    return this.isThisButton(this.heatmap_update,button,whithParam);
  },
  SET_LANGUAGE(button,whithParam=false){
    return this.isThisButton(this.set_language,button,whithParam);
  },

  isThisButton(thisButton,command,whithParam=false){
    if(whithParam){
      if(String(command).startsWith(thisButton+" ")||String(command).startsWith(thisButton+"\n")) return true;   
    }
    else{
      if(command==thisButton) return true;
    }
    return false;
  }
}



// Bot Commands
let BotCommands = {
  // start: "/start",
  switch_ogs: "/switch_ogs",
  mytime: "/playing_time",
  heatmap: "/heatmap",
  switch_lang: "/switch_lang",
  info: "/info",

  SWITCH_OGS(command,whithParam=false){
    return this.isThisCommand(this.switch_ogs,command,whithParam);
  },
  MYTIME(command,whithParam=false){
    return this.isThisCommand(this.mytime,command,whithParam);
  },
  HEATMAP(command,whithParam=false){
    return this.isThisCommand(this.heatmap,command,whithParam);
  },
  SWITCH_LANG(command,whithParam=false){
    return this.isThisCommand(this.switch_lang,command,whithParam);
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



// Users sheet structure
let tUsers = {
  sheetName: "Users",
  reg_date_Title: "дата регистрации",
  id_Title: "id",
  nick_Title: "ник",
  name_Title: "имя",
  current_action_Title: "текущее действие",
  role_Title: "OGS",
  language_code: "язык",
  allRange: "A:G",
  getColumnsOrder(){
    return [
      this.reg_date_Title,	
      this.id_Title,	
      this.nick_Title,	
      this.name_Title,	
      this.current_action_Title, 
      this.role_Title,
      this.language_code
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
