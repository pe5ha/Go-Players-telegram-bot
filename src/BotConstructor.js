
/**
 * Bot constructor v0.31
 */
// let token = process.env.BOT_TOKEN;
let token = PropertiesService.getScriptProperties().getProperty('BOT_TOKEN');
let SpreadsheetID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
let UsersSheet = "Users";
let LogSheet = "Log";
let DebugSheet = "Debug";

let debugEnable = true;

let bot_answer_for_unknown = "For any questions write me: t.me/pavel_naumenko";

let bot_greetings = "For use bot features send link on your online-go.com account\n";
// +"Link formal like this: https://online-go.com/user/view/[...]\n"
// +"or this: https://online-go.com/player/...";
let bot_OGS_id_error = "OGS account id not defined. Try another link";