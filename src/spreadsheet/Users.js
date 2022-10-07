


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

