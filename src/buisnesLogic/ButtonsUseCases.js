
function buttonsUseCases(){



  if(ButtonsCallbacks.HEATMAP_UPDATE(data,true)){
    let startMonthDate = new Date(data.split(" ")[1]);
    caseSendHeatMap(startMonthDate,true);
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