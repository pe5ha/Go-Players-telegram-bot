/**
 * версия 1
 */

function botSendText(chat_id, textToSend){
  let telegramResp = sendMessage(token, chat_id, textToSend);
  if(telegramResp.ok==true){
    //{ok=true, result={message_id=2502.0, text=mes, date=1.665002153E9, from={is_bot=true, id=2.053644544E9, first_name=Марс бот!!!, username=terraforming_mars_bot}, chat={type=private, username=Pavel_Naumenko, first_name=Павел Науменко, id=2.35733832E8}}}
    let sentMessage = telegramResp.result;
    let sentMessage_id = sentMessage.message_id;
    logBotSending(sentMessage.text);
  }
  else{ // ошибка отправки
    if(telegramResp.error_code==400){
      // {"ok":false,"error_code":400,"description":"Bad Request: chat not found"}
      // TODO
    }
    else if(telegramResp==403){
      // {"ok":false,"error_code":403,"description":"Forbidden: bot was blocked by the user"} 
      // TODO
    }
  }
}