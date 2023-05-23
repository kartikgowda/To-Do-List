const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

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

//* Create default items for our to-do list using the Item model

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

app.get('/', (req, res) => {
  // let day = date.getDate(); //* GetDate (date.js) function (Day,Date,Month)
  // let dayName = date.getDay(); //* GetDay (date.js) function (Day)
  Item.find({}).then((foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(() => {
          console.log('Successfully saved default items to DB.');
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect('/');
    } else res.render('list', { listTitle: 'Today', newListItem: foundItems });
  });
});

//* This code creates a new item in the database when a user submits a form on the index page.
//* The item is created by calling the save() method on the item, which is a mongoose model.
//* The save() method is called on the item to save it to the database.
//* The save() method returns a promise that resolves when the item is saved to the database.
//* The promise is then resolved, and the user is redirected to the index page.

app.post('/', (req, res) => {
  let itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
