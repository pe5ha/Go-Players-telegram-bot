// версия 1

function callbackQueryReceived(callback_query) {
  user_id = callback_query.from.id;
  chat_id = callback_query.message.chat.id;
  name = callback_query.from.first_name + (callback_query.from.last_name ? " " + callback_query.from.last_name : "");
  nick = (callback_query.from.username ? "@" + callback_query.from.username : "");
  language_code = callback_query.from.language_code;
  message_id = callback_query.message.message_id;
  data = callback_query.data;
  text = callback_query.message.text;
  callback_query.message.reply_markup.inline_keyboard.flat().forEach(e=>{
    if(e.callback_data==data) {
      button_title = e.text;
      return;
      }
  });

  logUpdate("Кнопка: ", data);
  
  // initial user checking
  userRegister(user_id);

  buttonsUseCases();
}