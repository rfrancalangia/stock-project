const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const axios = require('axios');
const cors = require('cors');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//API Key: pk_4cf8930d9fe24acd89c5a8fdb6066e97
//create call api function
function call_api(finishedAPI, ticker)
{
  request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_4cf8930d9fe24acd89c5a8fdb6066e97', {json: true}, (err, res, body) => {
    if (err)  {    return console.log(err);  }
    if(res.statusCode === 200)
    {
      finishedAPI(body);
    }
  });
};

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar index GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
      res.render('home', {
        stock: doneAPI
      });
    },"SPY");
});

//Set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
      // posted_stuff = req.body.stock_ticker;
      res.render('home', {
        stock: doneAPI
      });
    },
    req.body.stock_ticker);
});

// create about page route
app.get('/about.html', function (req, res) {
    axios.get('')
    res.render('about')
});


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '\public')));
// app.get('/', function(req, res){
//   res.render('index.html');
// });

app.listen(PORT, () => console.log("server listening on port 5000"));
