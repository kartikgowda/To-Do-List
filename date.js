module.exports.getDate = getDate;

function getDate() {
  let today = new Date();

  // Create an options object with the day, month, and year
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  // Use the options object and the toLocaleString method to create a string for today's date
  // @ts-ignore
  let day = today.toLocaleString('en-US', options);
  return day;
}

module.exports.getDay = getDay;

function getDay() {
  let today = new Date();

  // Create an options object with the day, month, and year
  let options = {
    weekday: 'long',
  };

  // Use the options object and the toLocaleString method to create a string for today's date
  // @ts-ignore
  let day = today.toLocaleString('en-US', options);
  return day;
}