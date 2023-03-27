const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   let today = new Date();
//   // let day = today.toLocaleDateString('en-US', { weekday: 'long' }); // ! Using New method
//   const options = {
//     weekday: 'long',
//     day: 'numeric',
//     month: 'long',
//   };

//   let day = today.getDay().toLocaleString('en-US', options); // ! Using New method
//   res.render('list', { todayDayType: day });
// });

app.get('/', (req, res) => {
  let today = new Date();

  if (today.getDay() === 6 || today.getDay() === 0) {
    // console.log('Today is a weekend!');
    res.send('<h1>Today is a weekend!</h1>');
  } else {
    // console.log('Today is a weekday!');
    res.send('<h1>Today is a weekday!</h1>');
  }
});

app.listen(3000, () => {
  console.log('Todoist App listening on port 3000!');
});
