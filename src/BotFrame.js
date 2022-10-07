/**
 * Globals variables
 */


// bot service variables
let chat_id;
let user_id;
let name;
let nick;
let date;
let message_id;
let text;
let data;
let textToSend;

// google tables service variables
let table = SpreadsheetApp.openById(SpreadsheetID);


function getToken(){return token;}
function getTableId(){return table.getId();}