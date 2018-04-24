var express = require('express');
var exphbs = require('express-handlebars');


var app = express();
var hbs = exphbs.create();

var totalfatalities = require('./casualties/totalfatalities');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views/layouts/');

app.locals.layout = 'index';

app.get('/', function(request, response) {
  var context = { title: 'Syrian Civil War Visualization' };
  response.render('index', context);
});

app.get('/totalfatalities', function(request, response) {
  // Get the total fatalities json
  totalfatalities.getTotalFatalities(totalFatalatiesOptions, function(statusCode, result) {
      // process low vs high estimates
      var estimates = totalfatalities.processEstimates(result.estimates);
      var context = {
        layout: 'totalfatalities',
        title: 'Syrian Civil War Total Fatalties Estimates',
        estimates
      };

      // Set the response using the status code and the context JSON
      console.log("context: " + JSON.stringify(context));
      response.statusCode = statusCode;
      response.render('totalfatalities', context);
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
