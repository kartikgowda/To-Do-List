const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//* Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

mongoose.connect(
  'mongodb+srv://admin-kartik:test123@cluster0.stb1b8l.mongodb.net/todolistDB?retryWrites=true&w=majority'
);

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
        res.render('list', { listTitle: 'Today', newListItems: foundItems });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// ! Add route to handle POST requests for adding new items to the database
app.post('/', (req, res) => {
  let itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName,
  });
  if (listName === 'Today') {
    item.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }).then((foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName);
    });
  }
});

// ! Add route to handle GET requests for custom lists
app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
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

// ! Add route to handle POST requests for deleting items from the database
// Add route to handle POST requests for deleting items from the database
app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.list;
  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if (err) console.log(err);
      else console.log('Successfully deleted checked item.');
      res.redirect('/');
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then(() => {
        res.redirect('/' + listName);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//! Add route to handle GET requests for about page
app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
