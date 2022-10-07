/**
 * Версия 0.3
 * Телеграмовские обращения к API методы
 */


function sendMediaGroup(token, chat_id, media) {
  let data = {
    method: "post",
    payload: {
      method: "sendMediaGroup",
      chat_id: String(chat_id),
      media: JSON.stringify(media)
    },
    muteHttpExceptions: true
  };
  return sendData(token, data);
}

function sendPhoto(token, chat_id, photo) {
  let data = {
    method: "post",
    payload: {
      method: "sendPhoto",
      chat_id: String(chat_id),
      photo: photo
    },
    muteHttpExceptions: true
  };
  return sendData(token, data);
}

function sendDocument(token, chat_id, text, blob) {
  let data = {
    method: "post",
    payload: {
      method: "sendDocument",
      chat_id: String(chat_id),
      document: blob,
      caption: text,
      parse_mode: "HTML",
      disable_notification: false
    },
    muteHttpExceptions: true
  };
  return sendData(token, data);
}

function copyMessage(token, chat_id, from_chat_id, message_id) {
  let data = {
    method: "post",
    payload: {
      method: "copyMessage",
      chat_id: String(chat_id),
      from_chat_id: String(from_chat_id),
      message_id: message_id
    },
    muteHttpExceptions: true
  };
  return sendData(token, data);
}

function editMessage(token, chat_id, message_id, txt, keyboard = null) {
  // если без кнопок сообщение то клавиатура null
  if (keyboard != null) keyboard = JSON.stringify(keyboard);

  let data = {
    method: "post",
    payload: {
      method: "editMessageText",
      chat_id: String(chat_id),
      message_id: String(message_id),
      text: txt,
      parse_mode: "HTML",
      reply_markup: keyboard
    }
  };
  let resp = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
  return JSON.parse(resp).result.message_id;
}

// function editMessage(token,chat_id,message_id,txt,keyboard){
//   let data={
//     method: "post",
//     payload:{
//       method: "editMessageText",
//       chat_id: String(chat_id),
//       message_id: String(message_id),
//       text: txt,
//       parse_mode: "HTML",
//       reply_markup: JSON.stringify(keyboard)
//     }
//   };
//   let resp = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
//   return JSON.parse(resp).result.message_id;
// }

function sendTextAndButtons(token, chat_id, txt, keyboard) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: txt,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  let resp = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
  let sendMessageId = JSON.parse(resp).result.message_id;
  return sendMessageId;
}

/**
* Send message. 
* Required: token, chat_id, textToSend.
* Optional: keyboard (null default), parsmode ("HTML" default), disableWebPagePreview (false default).
*
* @param  {String} token - The token of telegram bot.
* @param  {String} chat_id - The chat_id where send message.
* @param  {String} textToSend - The text of message.
* @param  {Object[][]} keyboard - Object of keyboard (optional).
* @param  {String} parse_mode - Parse mode HTLM or Markdown of message (optional).
* @param  {Boolean} disableWebPagePreview - Disables link previews for links in this message (optional).
* @returns {resp} Telegram response or null
*/
function sendMessage(token, chat_id, textToSend, keyboard = null, parsemode = "HTML", disableWebPagePreview = false) {
  // если без кнопок сообщение то клавиатура null
  if (keyboard != null) keyboard = JSON.stringify(keyboard);

  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: textToSend,
      parse_mode: parsemode,
      reply_markup: keyboard,
      disable_web_page_preview: disableWebPagePreview
    }
  };
  return sendData(token, data);
}

/**
 * 
 * @deprecated - use sendMessage instead
 */
function sendText(token, chat_id, txt) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: txt,
      parse_mode: "HTML"
    }
  };
  return sendData(token, data);
}

function forwardMessage(token, chat_id, from_chat_id, message_id) {
  let data = {
    method: "post",
    payload: {
      method: "forwardMessage",
      chat_id: String(chat_id),
      from_chat_id: String(from_chat_id),
      message_id: message_id
    }
  };
  return sendData(token, data);
}

function sendData(token, data) {
  try {
    let resp = UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/", data);
    return JSON.parse(resp);
  }
  catch (e) {
    Logger.log(e);
    return null;
  }
}


