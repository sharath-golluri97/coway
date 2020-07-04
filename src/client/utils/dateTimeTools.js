export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export function getDateTime(ts){
  let time = formatAMPM(ts);
  let date = ts.toLocaleDateString('en-GB', {
    day : 'numeric',
    month : 'short',
    year : 'numeric'
  });

  return {
    time: time,
    date: date
  };
}

