var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var hbs = exphbs.create({
            defaultLayout: 'default',
            layoutDir: './views/layouts',
            partialsDir: [
              './views/partials'
            ]
          });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function(request, response) {
  var context = { title: 'Syrian Civil War Visualization' };
  response.render('index', context);
});

app.listen(3000);
