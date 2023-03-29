exports.getDate = () => {
  // This function returns the current date in a string format
  let today = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  // @ts-ignore
  const day = today.toLocaleString('en-US', options);
  return day;
}

exports.getDay = () => {
  // This function returns the current day in a string format
  let today = new Date();

  const options = {
    weekday: 'long',
  };

  // @ts-ignore
  const day = today.toLocaleString('en-US', options);
  return day;
}