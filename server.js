var express = require('express');
var app = express();
var hbs = require('hbs');

app.set('view engine', 'html');
app.engine('html',hbs.__express);

app.get('/', function(request, response) {
  var scwvtitle = 'Syrian Civil War Visualization';
   response.render('index', {title:scwvtitle});
});

app.listen(3000);
