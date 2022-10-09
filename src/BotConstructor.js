
/**
 * Bot constructor v0.31
 */
// let token = process.env.BOT_TOKEN;
let token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
let SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

let LogSheet = "Log";
let DebugSheet = "Debug";

//dev
let debugEnable = true;

// table database
let usersData; // datebase global variable


// let regDateTitle = "reg date";
// let idTitle = "id";
let usersTableColumns = ["reg date",	"id",	"nick",	"name",	"current action", "role"];
let logTableColumns = ["time",	"id",	"nick",	"name",	"message_id", "action","what was sent",	"bot answer"];

// Users sheet structure
let UsersSheet = {
  SheetName: "Users",
  reg_date_Title: "reg date",
  id_Title: "id",
  nick_Title: "nick",
  name_Title: "name",
  current_action_Title: "current action",
  role_Title: "role",
  getColumnsOrder(){
    return [this.reg_date_Title,	this.id_Title,	this.nick_Title,	this.name_Title,	this.current_action_Title, this.role_Title];
  },
  getCol(columnTitle){
    return this.getColumnsOrder().indexOf(columnTitle);
  }
}

//User roles
let UserRoles = {
  OGS_id: "input OGS id",
  without_role: ""
}

//User Current Actions (use cases)
let UserCurrentActions = {
  input_OGS_id: "input OGS id",
  without_action: ""
}

let bot_start_message = "Узнать что-то\n /switch_ogs"
let bot_answer_for_unknown = "For any questions write me: t.me/pavel_naumenko";
let input_ogs_requst = "For use bot features send link on your online-go.com account\n";
// +"Link formal like this: https://online-go.com/user/view/[...]\n"
// +"or this: https://online-go.com/player/...";
let bot_OGS_id_error = "OGS account id not defined. Try another link";