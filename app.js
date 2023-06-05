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

//? Create Schema for custom lists

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema],
});

const List = mongoose.model('List', listSchema);

// ! Add default items to database if none exist
app.get('/', (req, res) => {
  // let day = date.getDate(); //* GetDate (date.js) function (Day,Date,Month)
  // let dayName = date.getDay(); //* GetDay (date.js) function (Day)

  Item.find({})
    .then((foundItems) => {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log('Successfully saved default items to DB.');
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect('/');
      } else {
        res.render('list', { listTitle: 'Today', newListItem: foundItems });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// ! Add route to handle POST requests for adding new items to the database
app.post('/', (req, res) => {
  let itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect('/');
});

// ! Add route to handle POST requests for deleting items from the database
app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId).then((err) => {
    if (err) console.log(err);
    else console.log('Successfully deleted checked item.');
  });
  res.redirect('/');
});

// ! Add route to handle GET requests for custom lists
app.get('/:customListName', (req, res) => {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName })
    .then((foundList) => {
      if (foundList === null) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect('/' + customListName);
      } else {
        res.render('list', {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//! Add route to handle GET requests for about page
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
