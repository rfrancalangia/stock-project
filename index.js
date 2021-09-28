const express = require('express');
const app = express();
const path = require('path');
var exphbs  = require('express-handlebars');

const PORT = process.env.PORT || 5000;

//Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
      stuff: "This is stuff"
    });
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, '\public')));
// app.get('/', function(req, res){
//   res.render('index.html');
// });

app.listen(PORT, () => console.log("server listening on port 5000"));
