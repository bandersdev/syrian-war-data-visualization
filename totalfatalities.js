var http = require("http");
var https = require("https");

exports.getTotalFatalities = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
};

/* Checks if each of the casualties lower and upper casualty estimates are
   equal. Sets the lower bound to 0 if they are equal so that handlebars
   templates can conditionally only display one value. */
exports.processEstimates = function(estimates) {

  for(var i = 0; i < estimates.length; i++) {
    if(estimates[i].lowEstimate === estimates[i].highEstimate) {
      estimates[i].lowEstimate = 0;
    }
  }
  return estimates;
}
