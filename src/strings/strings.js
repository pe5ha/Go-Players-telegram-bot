
let bot_start_message = "Узнать что-то\n /switch_ogs"
let bot_answer_for_unknown = "For any questions write me: t.me/pavel_naumenko";
let input_ogs_requst = "For use bot features send link on your online-go.com account\n";
// +"Link formal like this: https://online-go.com/user/view/[...]\n"
// +"or this: https://online-go.com/player/...";
let bot_OGS_id_error = "OGS account id not defined. Try another link";




let BotStrings = {
  bot_start_message: "Привет! Это бот MOVIELAND",
  start_message: {
    text: "Бот MOVIELAND *Главное меню*",
    reply_markup: {inline_keyboard:[
      [{
        text: "Правила",
        callback_data: ButtonsCallbacks.rules
      },{
        text: "Примеры из курса",
        callback_data: ButtonsCallbacks.lesson_examples
      }],[{
        text: "Задать куратору вопрос",
        callback_data: ButtonsCallbacks.ask_question
      }]
    ]},
    parse_mode: "MarkdownV2"
  },
  start_message_admin: {
    text: "Админские возможности:"+
    "\n/addstory - добавить новую воронку"+
    "\n/setrules - изменить сообщение правил бота"+
    "\n/settutors - изменить сообщение список кураторов"+
    "\n/set_admin_chat - чат в который отправлена эта команда будет установлен как чат для пересылки вопросов"+
    "\n/leave - отменить просмотр воронки"
  },
  addStory_instruction: {
    text:"<i>Для создания воронки пришли сообщение в таком формате (каждое поле с новой строчки):</i>\n\n"
  +AdminCommands.add_story+"\nНазвание воронки (обязательно)\nСсылка на урок в гк (необязательно)",
    parse_mode: "HTML"
  },
  question_instruction: {
    text: "Ты можешь отправить в бота любой вопрос по курсу и получить на него ответ!\nВсе детали связанные с вопросом указывай в том же сообщении."
    +"\nВ сообщении обязательно должен быть вопросительный знак '?' 😊\n",
  }
}