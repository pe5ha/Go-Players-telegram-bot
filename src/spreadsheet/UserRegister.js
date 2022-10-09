

/**
 * Функция регистрации новых пользователей в боте
 * @param {Number} id - id искомого пользователя
 * @returns false - если такой пользователь уже есть в базе, true - если не было в базе
 */
function userRegister(id) {
  // поиск юзера в списке уже существующих
  let tUsers = table.getSheetByName(UsersSheet.SheetName);
  if(tUsers == null) { // если такого листа нет
    table.insertSheet(UsersSheet.SheetName); // то такой лист создаётся
    tUsers = table.getSheetByName(UsersSheet.SheetName);
    let style = SpreadsheetApp.newTextStyle().setBold(true).setItalic(true).build();
    tUsers.getRange(1,1,1,UsersSheet.getColumnsOrder().length).setValues([UsersSheet.getColumnsOrder()]).setTextStyle(style).setHorizontalAlignment("center");
  }
  usersData = tUsers.getRange('A:F').getValues(); // массив всех значений id
  let row = -1;
  let i;
  for (i = 0; i < usersData.length; i++) { // цикл от 0 до сколько всего юзеров
    if (usersData[i].indexOf(parseInt(id)) !== -1) { // если запрашиваемый id найден
      row = i + 1; // то row = номер юзера в массиве + 1, т.к. заголовки
      break;
    }
  }

  // добавление юзера
  if (row === -1) { // если юзер с таким id не записан, то регистрируем его
    user = makeUser(2,user_id,nick,name,UserCurrentActions.input_OGS_id);
    let userData = [[stringDate(),user.telegramID,user.nick,user.name,user.currentAction,user.role]]; // массив данных пользователя
    // userData[0].push(surname); // фамилия
    
    tUsers.insertRowBefore(2); // в лист юзеров вставляется новая строка сверху (после заголовков)
    tUsers.getRange(2, 1, 1, userData[0].length).setValues(userData); // вставка инфы юзера

    // создание индивидуального листа, привязанного к id юзера
    //   let tPersonSheet = table.getSheetByName(""+id); // открытие листа, если он уже есть
    //   if(tPersonSheet == null) { // если индивидуального листа нет
    //     table.insertSheet(""+id,7); // то такой лист создаётся
    //     tPersonSheet = table.getSheetByName(""+id); // и открывается
    //   }
    // добавление ссылки на личный лист в списке юзеров
    //   let richText = SpreadsheetApp.newRichTextValue().setText("Таблица " + name).setLinkUrl("#gid=" + tPersonSheet.getSheetId()).build(); // создание ссылки на личный лист
    //   tUsers.getRange(2,userData.length+1).setRichTextValue(richText); // запись в нужную ячейку на листе юзеров
    return true;
  }
  else { //апдейт данных о пользователе, которые могли измениться
    if (usersData[i][UsersSheet.getCol(UsersSheet.nick_Title)] !== nick) {
      tUsers.getRange(row, UsersSheet.getCol(UsersSheet.nick_Title)+1).setValue(nick);
    }
    if (usersData[i][UsersSheet.getCol(UsersSheet.name_Title)] !== name) {
      tUsers.getRange(row, UsersSheet.getCol(UsersSheet.name_Title)+1).setValue(name);
    }
    user = makeUser(
      row,
      user_id,
      nick,
      usersData[i][UsersSheet.getCol(UsersSheet.name_Title)],
      usersData[i][UsersSheet.getCol(UsersSheet.current_action_Title)],
      usersData[i][UsersSheet.getCol(UsersSheet.role_Title)]
    );
    return false;
  }
}
