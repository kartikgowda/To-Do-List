const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let today = new Date();

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  let day = today.toLocaleString('en-US', options);
  res.render('list', { todayDay: day });
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
