
function rulesButtnon(){

  let tValues = table.getSheetByName("BotValues");
  let rulesAdres = tValues.getRange("A2").getValue().split(":");
  botCopyMessage(chat_id,rulesAdres[0],rulesAdres[1]);
}

function needTutorButtnon(){
  
  let tValues = table.getSheetByName("BotValues");
  let rulesAdres = tValues.getRange("A3").getValue().split(":");
  botCopyMessage(chat_id,rulesAdres[0],rulesAdres[1]);
}

function lessonExamplesButtnon(){
  botSendMessage(chat_id,"Not implement yet");
}

function askQuestion(){
  botSendTextV2(chat_id,BotStrings.question_instruction);
}