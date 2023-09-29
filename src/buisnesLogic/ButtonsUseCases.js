
function buttonsUseCases(){

  let command = String(data).split("=")[0];

  if(command == "heatmap_update"){
    let ogsID = data.split("=")[1];
    let startMonthDate = new Date(data.split("=")[2]);
    sendHeatmapAndPlayingTime(ogsID,startMonthDate,true);
  }
  else if(command == "save_heatmap"){
    TelegramAPI.editMessageReplyMarkup(token,chat_id,message_id,null); // удалить у сообщения кнопки
    botCopyMessage(chat_id,chat_id,message_id,reply_markup);
  }
  else if(ButtonsCallbacks.SET_LANGUAGE(data,true)){
    let language = data.split(" ")[1];
    setUserLanguage(user,language);
    botEditMessage(chat_id,message_id,buildHelloMes(),null);
  }

  // switch (data) {
  //   case ButtonsCallbacks.heatmap_update:
  //     rulesButtnon();
  //     break;

  //   case ButtonsCallbacks.need_tutor:
  //     needTutorButtnon();
  //     break;

  //   case ButtonsCallbacks.lesson_examples:
  //     lessonExamplesButtnon();
  //     break;

  //   case ButtonsCallbacks.ask_question:
  //     askQuestion();
  //     break;
  // }
}