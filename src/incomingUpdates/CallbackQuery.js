


function callbackQueryReceived(callback_query) {
  user_id = callback_query.from.id;
  name = callback_query.from.first_name + " " + callback_query.from.last_name;
  nick = "@" + callback_query.from.username;
  message_id = callback_query.message.message_id;
  data = callback_query.data;

  logUpdate("Кнопка: ", data);

  switch (data) {
    case "start ok":

      break;
    case "ok":
      break;
    case "pas":
      break;
    case "draft ok":
      break;
  }
}