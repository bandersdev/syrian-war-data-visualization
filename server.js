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

var totalfatalities = require('./totalfatalities');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.locals.layout = 'index';

app.get('/', function(request, response) {
  var context = { title: 'Syrian Civil War Visualization' };
  response.render('index', context);
});

app.get('/totalfatalities', function(request, response) {
  totalfatalities.getTotalFatalities(totalFatalatiesOptions, function(statusCode, result) {
      var resultstring = JSON.stringify(result);
      var context = {
        layout: 'totalfatalities',
        title: 'Syrian Civil War Visualization',
        data: resultstring
      };

      // I could work with the result html/json here.  I could also just return it
      console.log("onResult: (" + statusCode + ")" + resultstring);
      response.statusCode = statusCode;
      response.render('totalfatalities', context);
      /*response.send(result);*/
  });
});

app.listen(3000);

/*  total fatalities request options */
var totalFatalatiesOptions = {
  host: 'localhost',
  port: '8080',
  path: '/totalfatalities/allestimates',
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects: 10,
  headers: {
        'Content-Type': 'application/json'
    }
};
