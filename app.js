const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Create a new date object
  let today = new Date();

  // Create an options object with the day, month, and year
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  // Use the options object and the toLocaleString method to create a string for today's date
  let day = today.toLocaleString('en-US', options);

  // Render the list.ejs file and pass in the date string
  res.render('list', { todayDay: day });
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
