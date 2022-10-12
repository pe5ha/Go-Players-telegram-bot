// версия 1

function messageReceived(message) {
  chat_id = message.chat.id;
  user_id = message.from.id;
  name = message.from.first_name + (message.from.last_name ? " " + message.from.last_name : "");
  nick = (message.from.username ? "@" + message.from.username : "");
  date = message.date;
  text = message.text;
  message_id = message.message_id;

  logUpdate("Сообщение: ",text);


  if (chat_id == user_id) { // сообщения в лс
    directMessage();
  }
  else { // сообщения в групповых чатах (и каналах ?)
    groupChatMessage();
  }
}