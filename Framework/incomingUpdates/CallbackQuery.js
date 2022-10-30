// версия 1

function callbackQueryReceived(callback_query) {
  user_id = callback_query.from.id;
  chat_id = callback_query.message.chat.id;
  name = callback_query.from.first_name + (callback_query.from.last_name ? " " + callback_query.from.last_name : "");
  nick = (callback_query.from.username ? "@" + callback_query.from.username : "");
  language_code = callback_query.from.language_code;
  message_id = callback_query.message.message_id;
  data = callback_query.data;

  logUpdate("Кнопка: ", data);

  switch (data) {
    case ButtonsCallbacks.rules:
      rulesButtnon();
      break;

    case ButtonsCallbacks.need_tutor:
      needTutorButtnon();
      break;

    case ButtonsCallbacks.lesson_examples:
      lessonExamplesButtnon();
      break;

    case ButtonsCallbacks.ask_question:
      askQuestion();
      break;
  }
}