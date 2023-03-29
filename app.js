const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

// console.log(date);
// const ejs = require('ejs');

const app = express();
let items = ['Buy Food', 'Cook Food', 'Eat Food'];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  // // Create a new date object
  // let today = new Date();

  // // Create an options object with the day, month, and year
  // const options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long',
  // };

  // // Use the options object and the toLocaleString method to create a string for today's date
  // // @ts-ignore
  // let day = today.toLocaleString('en-US', options);
  let day = date.getDate(); //* GetDate (date.js) function (Day,Date,Month)
  let dayName = date.getDay(); //* GetDay (date.js) function (Day)
  // Render the list.ejs file and pass in the date string
  res.render('list', { listTitle: day, newListItem: items });
});

app.post('/', (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work', newListItem: workItems });
});

// app.post('/work', (req, res) => {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
