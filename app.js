const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// let items = ['Buy Food', 'Cook Food', 'Eat Food'];
// let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//* Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

//* Create Schema
const itemsSchema = new mongoose.Schema({
  name: String,
});

//* Create Model
const Item = mongoose.model('Item', itemsSchema);

//* Create Documents
const item1 = new Item({
  name: 'Welcome to your To Do List!',
});

const item2 = new Item({
  name: 'Hit the + button to add a new item.',
});

const item3 = new Item({
  name: '<-- Hit this to delete an item.',
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems)
  .then(() => {
    console.log('Successfully saved default items to DB.');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  // let day = date.getDate(); //* GetDate (date.js) function (Day,Date,Month)
  // let dayName = date.getDay(); //* GetDay (date.js) function (Day)
  res.render('list', { listTitle: 'Today', newListItem: items });
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

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
