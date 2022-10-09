
function stringDate(timestamp){
  if(timestamp) return Utilities.formatDate(new Date(timestamp), "GMT+3", "dd.MM.yyyy HH:mm:ss");
  else return Utilities.formatDate(new Date(), "GMT+3", "dd.MM.yyyy HH:mm:ss");
}
