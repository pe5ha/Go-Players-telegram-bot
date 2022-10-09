function makeUser(rowInTable, telegramID,nick,name,currentAction=null,role=null){
  return {
    telegramID: telegramID,
    nick: nick,
    name: name,
    currentAction: currentAction,
    role: role,
    rowInTable
  }
}

/**
 * 
 * @deprecated - is need fix
 */
function getUseridByUsername(username) {
  let tUsers = table.getSheetByName("Users");

  let idlist = tUsers.getRange('D:D').getValues();
  // idlist = idlist.flat(); // делает 2д массив одномерным
  for (let i = 0; i < idlist.length; i++) {
    for (let j = 0; j < idlist[i].length; j++) {
      if (idlist[i][j].toLowerCase() === username.toLowerCase()) {
        let row = i + 1;
        return tUsers.getRange(row, 2).getValue();
      }
    }
  }
  return null;
}


function setUserRole(user_id,role){
  let tUsers = table.getSheetByName(UsersSheet.SheetName);
  tUsers.getRange(user.rowInTable, UsersSheet.getCol(UsersSheet.role_Title)+1).setValue(role);
}